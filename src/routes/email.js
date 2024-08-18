const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const { postEmal, allemails,deleteEmail } = require("../controller/email");
  
router.post("/post", postEmal);

router.get("/mails", allemails);
router.delete("/:id", deleteEmail);
module.exports = router;
