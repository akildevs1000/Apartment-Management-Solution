const Yup = require("yup");
const { user: User } = require("../models");
const { checkExistence } = require("../helpers/utils.js");

const schema = Yup.object().shape({
    username: Yup.string().required().min(3).max(20),
    email: Yup
        .string()
        .required()
        .test('unique', 'Email already exists', checkExistence(Role, "role"))
        .min(3)
        .max(20),
    password: Yup
        .string()
        .min(8, 'Password must be at least 8 characters long.')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .matches(/[0-9]/, 'Password must contain at least one number.'),
    mobile: Yup
        .integer()
        .required()
        .test('unique', 'Email already exists', checkExistence(User, "mobile")),
    photo: Yup.string().required(),
    role_id: Yup
        .integer()
        .required(),
    apartment_id: Yup
        .integer()
        .required()
});

module.exports = schema;
