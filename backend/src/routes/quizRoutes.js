const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const auth = require("../middleware/authMiddleware");


router.get("/start", auth, quizController.startQuiz);


router.post("/submit", auth, quizController.submitQuiz);

module.exports = router;
