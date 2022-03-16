const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./configs/db");

// const PORT = process.env.PORT || 5000;

//mddleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//router
app.use("/employee", require("./routers/employeeRouter"));

db.authenticate()
  .then(() => console.log("Connected Database...."))
  .catch((err) => console.log("Failed" + err));

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
