const { apartment: Model } = require("../models");

const valdiationSchema = require("../validations/apartmentValidation");
const { errors, paginate, toTitle } = require("../helpers/utils.js");

const index = async ({ query }, res) => {
    try {
        const { count, rows: data } = await Model.findAndCountAll(await paginate(query));

        const { page, per_page } = query;

        res.send({
            count,
            data,
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / per_page)
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve data", error });
    }
};

const show = async (req, res) => {
    try {
        const apartment = await Model.findOne();
        if (apartment) {
            res.json(apartment);
        } else {
            res.status(404).json({ message: `${toTitle(Model.name)} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve data", error });
    }
};

const update = async ({ body, params: { id } }, res) => {
    try {
        const [rowsAffected, [updated]] = await Model.update(body, {
            returning: true,
            where: { id },
        });

        if (rowsAffected) {
            res.json({ message: `${toTitle(Model.name)} updated successfully`, record: updated });
        } else {
            res.status(404).json({ message: "Apartment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: `Failed to update ${Model.name}`, error });
    }
};

const destroy = async ({ params: { id } }, res) => {
    try {
        const deleted = await Model.destroy({ where: { id } });
        res.json({ message: deleted ? `${toTitle(Model.name)} has been deleted` : "Failed to delete" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete data", error });
    }
};

const store = async ({ body }, res) => {
    try {
        const validated = await valdiationSchema.validate(body, {
            abortEarly: false,
        });
        res.send({ message: `${toTitle(Model.name)} has beed inserted`, record: await Model.create(validated) });
    } catch ({ inner }) {
        res.status(400).send(await errors(inner));
    }
};

module.exports = {
    store,
    index,
    show,
    update,
    destroy,
};
