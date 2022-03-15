const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
import { StatusCodes } from "http-status-codes";

const userController = {
  register: async (req, res) => {
    try {
      const { username, password, avatar } = req.body;
      const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      if (user.rows.length !== 0) {
        return res.status(StatusCodes.UNAUTHORIZED).send("User already exists");
      }
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);

      const bcryptPassword = await bcrypt.hash(password, salt);

      const newUser = await pool.query(
        "INSERT INTO users (username, password, avatar) VALUES ($1, $2, $3) RETURNING *",
        [username, bcryptPassword, avatar]
      );

      const token = jwtGenerator(newUser.rows[0].user_id);

      res.json({ token });
    } catch (error) {
      console.log(error.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, msg: "Internal server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

      if (user.rows.length === 0) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Username or Password invalid");
      }

      const validPassword = await bcrypt.compare(password, user.rows[0].password);

      if (!validPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json("Username or Password invalid");
      }

      const token = jwtGenerator(user.rows[0].user_id);

      res.json({ token });
    } catch (error) {
      console.log(error.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, msg: "Internal server error" });
    }
  },
  isVerify: async (req, res) => {
    try {
      res.json(true);
    } catch (error) {
      console.log(error.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, msg: "Internal server error" });
    }
  },
};

module.exports = userController;
