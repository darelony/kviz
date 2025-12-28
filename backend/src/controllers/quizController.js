const Question = require("../models/QuestionModel");
const db = require("../config/db");


exports.startQuiz = async (req, res) => {
  try {
    const questions = await Question.getRandomQuestions(10);

    // formatiramo pitanja
    const formatted = questions.map(q => ({
      id: q.id,
      text: q.question,
      options: [q.option_a, q.option_b, q.option_c, q.option_d],
      correct_option: q.correct_option // 'A', 'B', 'C', 'D' direktno
    }));

    res.json({ questions: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to start quiz" });
  }
};


exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !answers.length) {
      return res.status(400).json({ error: "No answers submitted" });
    }

    // Nabavljamo tačne opcije za posata pitanja
    const ids = answers.map(a => a.questionId);
    const correctAnswers = await Question.getCorrectAnswers(ids);

    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;

    correctAnswers.forEach(q => {
      const userAnswer = answers.find(a => a.questionId === q.id);

      if (userAnswer) {
        // Poređenje po oznaci opcije 'A' | 'B' | 'C' | 'D'
        if (userAnswer.selectedOption === q.correct_option) {
          score++;
          correctCount++;
        } else {
          wrongCount++;
        }
      } else {
        wrongCount++;
      }
    });

    // Čuvamo rezultat u bazi
    const sql = `INSERT INTO quiz_results (user_id, score) VALUES (?, ?)`;
    db.run(sql, [req.user.id, score], function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to save score" });
      }

      // Vraćamo detalje da frontend može odmah da prikaže
      res.json({
        score,
        correct: correctCount,
        wrong: wrongCount
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit quiz" });
  }
};
