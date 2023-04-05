const { parsed: { USER, PASSWORD, DATABASE, HOST, DRIVER } } = require("dotenv").config();

module.exports = {
  development: {
    username: USER,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    dialect: DRIVER,
  },
};
