const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateStatus } = require("../controller/user");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/toggle-status/:id",updateStatus)
module.exports = router;