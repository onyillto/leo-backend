const express = require("express");
const router = express.Router();
const { registerUser, loginUser,status } = require("../controller/user");
const { status } = require("../controller/email");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/toggle-status/:id",status)
module.exports = router;