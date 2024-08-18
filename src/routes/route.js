const express = require("express");
const router = express.Router();
const { registerUser, loginUser,status } = require("../controller/user");
const { status } = require("../controller/email");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/email/toggle-status",status)
module.exports = router;