const { user: Model } = require("../models");

const valdiationSchema = require("../validations/userValidation");
const { errors, processPhoto, paginate, toTitle } = require("../helpers/utils.js");

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
        const model = await Model.findOne();
        if (model) {
            res.json(model);
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
        validated.photo = await processPhoto(body.photo, body.ext);

        res.send({ status: true, message: `${toTitle(Model.name)} has beed inserted`, record: await Model.create(validated) });
    } catch (Error) {
        let [status, err] = Error && Error.inner ? [400, await errors(Error.inner)] : [500, { ServerError: Error }];

        res.status(status).send(err);
    }
};

module.exports = {
    store,
    index,
    show,
    update,
    destroy,
};
