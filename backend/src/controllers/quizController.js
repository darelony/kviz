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

    const ids = answers.map(a => a.questionId);
    const correct = await Question.getCorrectAnswers(ids);

    let score = 0;

    correct.forEach(q => {
      const userAnswer = answers.find(a => a.questionId === q.id);

      
      let correctText;
      switch (q.correct_option) {
        case 'A': correctText = q.option_a; break;
        case 'B': correctText = q.option_b; break;
        case 'C': correctText = q.option_c; break;
        case 'D': correctText = q.option_d; break;
        default: correctText = null;
      }

      if (userAnswer && userAnswer.selected === correctText) {
        score++;
      }
    });

  
    const sql = `INSERT INTO quiz_results (user_id, score) VALUES (?, ?)`;
    db.run(sql, [req.user.id, score], function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to save score" });
      }
      res.json({ score });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit quiz" });
  }
};
