const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  postEmail,
  allemails,
  deleteEmail,
  updateStatus,
} = require("../controller/email");
  
router.post("/post", postEmail);

router.get("/mails", allemails);
router.delete("/:id", deleteEmail);

router.patch("/toggle-status/:id", updateStatus);
module.exports = router;
