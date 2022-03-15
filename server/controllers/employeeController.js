const pool = require("../db");
import { StatusCodes } from "http-status-codes";

const employeeController = {
  getEmployees: async (req, res) => {
    try {
      const allEmployees = await pool.query(
        "SELECT employee_id, firstname, lastname, email, department.department_name, department.department_id FROM employee JOIN department ON employee.department_id = department.department_id"
      );
      res.status(StatusCodes.OK).json({
        success: true,
        msg: "Get Employees Successfull",
        employee: allEmployees.rows,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  },
  getEmployee: async (req, res) => {
    try {
      const anEmployee = await pool.query(
        "SELECT employee_id, firstname, lastname, email, department.department_name FROM employee JOIN department ON employee.department_id = department.department_id "
      );
    } catch (error) {
      console.log(error.message);
    }
  },
  createEmployee: async (req, res) => {
    try {
      const { firstname, lastname, email, department_id } = req.body;

      const newEmployee = await pool.query(
        "INSERT INTO employee (firstname, lastname, email, department_id) VALUES($1, $2, $3, $4) RETURNING *",
        [firstname, lastname, email, department_id]
      );
      res.status(200).json({
        success: true,
        msg: "Created Success",
        employee: newEmployee.rows[0],
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  },
  updateEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const { firstname, lastname, email, department_id } = req.body;
      const updateEmployee = await pool.query(
        "UPDATE employee SET firstname = $1, lastname = $2, email = $3, department_id = $4 WHERE employee_id = $5",
        [firstname, lastname, email, department_id, id]
      );
      res.status(200).json({
        success: true,
        msg: "Updated Success",
        employee: updateEmployee.rows,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  },
  deleteEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteEmployee = await pool.query("DELETE FROM employee WHERE employee_id = $1", [id]);
      res.status(200).json({
        success: true,
        msg: "Deleted Success",
        employee: deleteEmployee.rows,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  },
};

module.exports = employeeController;
