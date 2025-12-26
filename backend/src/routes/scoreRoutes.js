const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, scoreController.getScoreboard);

module.exports = router;