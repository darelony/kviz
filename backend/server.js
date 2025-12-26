const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const quizRoutes = require('./src/routes/quizRoutes');
const scoreRoutes = require('./src/routes/scoreRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);      // za login/register
app.use('/questions', quizRoutes); // za dobijanje pitanja
app.use('/scores', scoreRoutes);   // za rezultate

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
