const db = require("../config/db");

exports.getRandomQuestions = (limit = 10) => {
    return new Promise((resolve, reject) =>{
        const sql = `
        SELECT id, question, option_a, option_b, option_c, option_d, correct_option
        FROM questions
        ORDER BY RANDOM()
        LIMIT ?
        `;
        db.all(sql, [limit], (err, rows) =>{
            if (err) reject(err);
            else resolve(rows)
        });
    });
};


exports.getCorrectAnswers = (questionIds) => {
    return new Promise((resolve, reject) =>{
        const placeholders = questionIds.map(() => "?").join(",");
        const sql = `
            SELECT id, correct_option
            FROM questions
            WHERE id in (${placeholders})
        `;
        db.all(sql, questionIds, (err, rows) =>{
            if (err) reject(err);
            else resolve(rows)
        });
    });
};

