const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");
const User = require("../models/UserModel");

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed" });
    }
};

// REGISTER
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);
         await User.createUser(username, email, hashed); 

         const user = await User.findByEmail(email);

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Register failed" });
    }
};
