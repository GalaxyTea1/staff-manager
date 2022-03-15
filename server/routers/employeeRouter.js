const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authorization = require("../middleware/authorization");

// router.use("/", authorization);
router.get("/", employeeController.getEmployees);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
