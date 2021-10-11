const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");
const Employee = require("../controllers/employee");

const router = express.Router();

router.get("/", auth.verifyAccessToken, Employee.index);
router.post("/show", Employee.show);
router.post("/store", upload.array("avatar"), Employee.store);
router.post("/update", Employee.update);
router.post("/destory", Employee.destory);

module.exports = router;
