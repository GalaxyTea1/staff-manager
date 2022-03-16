const Sequelize = require("sequelize");
require("dotenv").config();

module.exports = new Sequelize(
  `${process.env.DATABASE}`,
  `${process.env.DB_USERNAME}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: `${process.env.HOST}`,
    port: `${process.env.PORT}`,
    dialect: `${process.env.DB_USE}`,
  }
);
