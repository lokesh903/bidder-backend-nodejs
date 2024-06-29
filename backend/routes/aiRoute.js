const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { generateReply } = require("../controllers/aiControllers");

const router = express.Router();

router.route("/generate_data").post(protect, generateReply);
module.exports = router;
