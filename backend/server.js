const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');
const attempts = require('./routes/attempts');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questions');


const app = express();
const allowedOrigins = ['https://mern-project-frontend-ongz.onrender.com'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/questions', questionRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/attempts', attempts); // 🔁 matches your frontend URL
app.use('/api/leaderboard', leaderboardRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch(err => console.error(err));
