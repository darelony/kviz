const db = require("../config/db");

// GET SCOREBOARD
exports.getScoreboard = (req, res) => {
  // Pretpostavljamo da u quiz_results imamo user_id i score
  // a tabela users ima username
  const sql = `
    SELECT u.username, q.score, 
           q.score AS correct, 
           (10 - q.score) AS wrong
    FROM quiz_results q
    JOIN users u ON u.id = q.user_id
    ORDER BY q.score DESC
    LIMIT 20
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch scoreboard" });
    }

    
    res.json({ scores: rows });
  });
};
