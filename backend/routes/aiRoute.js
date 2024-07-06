const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { generateReply,generateReplyV01 } = require("../controllers/aiControllers");

const router = express.Router();

router.route("/generate_data").post(protect, generateReplyV01);
module.exports = router;
