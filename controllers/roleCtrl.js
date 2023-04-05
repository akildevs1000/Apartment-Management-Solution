const db = require("../models");
const valdiationSchema = require("../validations/roleValidation");
const { errors, processPhoto } = require("../helpers/utils.js");

const Role = db.role;

const index = async (req, res) => res.send(await Role.findAll());

const show = async (req, res) => {
    try {
        const role = await Role.findOne({
            where: {
                id: req.params.id,
            }
        });
        if (role) {
            res.json(role);
        } else {
            res.status(404).json({ message: "role not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve data", error });
    }
};

const destroy = async (req, res) => {
    try {
        const role = await Role.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (role) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: "role not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve data", error });
    }
};

const store = async ({ body }, res) => {
    try {
        const validated = await valdiationSchema.validate(body, {
            abortEarly: false,
        });

        await Role.create(validated);
        let response = { status: true, message: "Role created" };
        return res.status(200).json(response);
    } catch ({ inner }) {
        res.status(400).send(await errors(inner));
    }
};

module.exports = {
    store,
    index,
    show,
    destroy,
};
