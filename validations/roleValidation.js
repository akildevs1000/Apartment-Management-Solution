const Yup = require("yup");
const { role: Role } = require("../models");
const { checkExistence } = require("../helpers/utils.js");

const schema = Yup.object().shape({
    role: Yup
        .string()
        .required()
        .test('unique', 'Role already exists', checkExistence(Role, "role"))
        .min(3)
        .max(20),
    slug: Yup.string().required().min(3).max(20),
});

module.exports = schema;
