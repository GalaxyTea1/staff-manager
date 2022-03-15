const pool = require("../db");
import { StatusCodes } from "http-status-codes";

const dashboardController = {
  dashboard: async (req, res) => {
    try {
      const user = await pool.query("SELECT username FROM users WHERE user_id = $1", [req.user.id]);
      res.json(user.rows[0]);
    } catch (error) {
      console.log(error.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, msg: "Internal server error" });
    }
  },
};

module.exports = dashboardController;
