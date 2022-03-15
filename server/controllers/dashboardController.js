const pool = require("../db");

const dashboardController = {
  dashboard: async (req, res) => {
    try {
      const user = await pool.query("SELECT username FROM users WHERE user_id = $1", [req.user.id]);
      res.json(user.rows[0]);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, msg: "Internal server error" });
    }
  },
};

module.exports = dashboardController;
