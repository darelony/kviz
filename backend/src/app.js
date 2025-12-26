const express = require("express");
const cors = require("cors");
const authRoutes = require("../src/routes/authRoutes")
const quizRoutes = require("../src/routes/quizRoutes");
const scoreRoutes = require("../src/routes/scoreRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/quiz", quizRoutes);

app.use("/api/scores", scoreRoutes);

app.get("/", (req, res) => {
    res.send("Quiz API is running");
} )

module.exports = app;