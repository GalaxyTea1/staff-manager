// const express = require("express");
// const dashboardController = require("../controllers/dashboardController");
// const authorization = require("../middleware/authorization");
// const router = express.Router();

// router.post("/", authorization, dashboardController.dashboard);

// module.exports = router;
const router = require("express").Router();
const authorize = require("../middleware/authorization");
const pool = require("../db");

router.post("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT username, user_id, avatar FROM users WHERE user_id = $1",
      [req.user]
    );

    //if would be req.user if you change your payload to this:

    //   function jwtGenerator(user_id) {
    //   const payload = {
    //     user: user_id
    //   };

    res.json({ message: "success", user: user.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
