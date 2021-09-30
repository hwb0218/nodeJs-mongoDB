const express = require("express");
const EmployeeController = require("../controllers/EmployeeController");

const router = express.Router();

router.get("/", EmployeeController.index);
router.post("/show", EmployeeController.show);
router.post("/store", EmployeeController.store);
router.post("/update", EmployeeController.update);
router.post("/destory", EmployeeController.destory);

module.exports = router;
