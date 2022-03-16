const { Sequelize, DataTypes } = require("sequelize");
const db = require("../configs/db");

const EmployeeModel = db.define("employee", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    autoIncrement: true,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    isEmail: true,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});

module.exports = EmployeeModel;
