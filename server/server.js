const express = require("express");
const morgan = require("morgan");
const mongo = require("./db");
const EmployeeRoute = require("./routes/employee");

const app = express();

require("dotenv").config({ path: "variables.env" });

mongo.connect();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/employee", EmployeeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
