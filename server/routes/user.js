const express = require("express");
const auth = require("../middleware/auth");
const user = require("../controllers/user");

const router = express.Router();

router.post("/register", user.register);
router.post("/login", user.login);
router.post("/refreshToken", auth.verifyRefreshToken, user.refreshToken);

module.exports = router;
