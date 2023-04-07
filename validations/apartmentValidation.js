const Yup = require("yup");
const { apartment: Model } = require("../models");
const { checkExistence,toTitle } = require("../helpers/utils.js");

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required()
        .test('unique', `${toTitle(Model.name)} already exists`, checkExistence(Model, "name"))
        .min(3)
        .max(20),
    address: Yup
        .string()
        .required()
        .min(3)
        .max(500),
});

module.exports = schema;
