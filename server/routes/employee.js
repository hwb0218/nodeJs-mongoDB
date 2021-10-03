const express = require("express");
const upload = require("../middleware/multer");
const EmployeeController = require("../controllers/EmployeeController");

const router = express.Router();

router.get("/", EmployeeController.index);
router.post("/show", EmployeeController.show);
router.post("/store", upload.array("avatar"), EmployeeController.store);
router.post("/update", EmployeeController.update);
router.post("/destory", EmployeeController.destory);

module.exports = router;
