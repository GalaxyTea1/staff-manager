const express = require("express");
const userController = require("../controllers/userController");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const router = express.Router();

router.post("/register", validInfo, userController.register);
router.post("/login", validInfo, userController.login);
router.get("/is-verify", authorization, userController.isVerify);

module.exports = router;
