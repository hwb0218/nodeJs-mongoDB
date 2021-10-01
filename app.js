const express = require("express");
const morgan = require("morgan");
const mongo = require("./server/database");
const EmployeeRoute = require("./server/routes/employee");

const app = express();

require("dotenv").config({ path: "variables.env" });

mongo.connect();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/views/block.html");
});

app.use("/api/employee", EmployeeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
