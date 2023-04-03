const { parsed: dotenv } = require("dotenv").config();
module.exports = {
  development: {
    username: dotenv.USERNAME,
    password: dotenv.PASSWORD,
    database: dotenv.DATABASE,
    host: dotenv.HOST,
    dialect: dotenv.DRIVER,
  },
};
