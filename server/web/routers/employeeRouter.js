const express = require("express");
const router = express.Router();
const db = require("../../configs/db");
const employeeModel = require("../../models/employeeModel");

router.get("/", (req, res) => res.send("Employee"));
router.get("/", (req, res) => {
  employeeModel
    .findAll()
    .then((Employee) => {
      console.log(Employee);
      res.status(200);
    })
    .catch((err) => console.log("Failed" + err));
});

module.exports = router;
