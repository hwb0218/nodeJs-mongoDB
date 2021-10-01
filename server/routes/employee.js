const express = require("express");
const EmployeeController = require("../controllers/EmployeeController");

const router = express.Router();
const upload = require("../middleware/multer");

router.get("/", EmployeeController.index);
router.post("/show", EmployeeController.show);
router.post("/store", upload.single("avatar"), EmployeeController.store);
router.post("/update", EmployeeController.update);
router.post("/destory", EmployeeController.destory);

module.exports = router;
