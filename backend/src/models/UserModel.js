const db = require("../config/db");

exports.createUser = (username, email, passwordHash) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO users (username, email, password_hash)
            VALUES (?, ?, ?)
        `;
        db.run(sql, [username, email, passwordHash], function (err) {
            if (err) return reject(err);

          
            db.get("SELECT * FROM users WHERE id = ?", [this.lastID], (err, row) => {
                if (err) reject(err);
                else resolve(row); 
            });
        });
    });
};

exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, row) => {
                if (err) reject(err);
                else resolve(row);
            }
        );
    });
};
