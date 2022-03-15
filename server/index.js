const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// const PORT = process.env.PORT || 5000;

//mddleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//router
app.use("/employees", require("./routers/employeeRouter"));
app.use("/departments", require("./routers/departmentRouter"));
app.use("/supervisor", require("./routers/supervisorRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/dashboard", require("./routers/dashboardRouter"));

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
