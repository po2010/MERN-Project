// GET: /api/leaderboard/:quizId
const express = require('express');
const router = express.Router();
const Attempt = require('../models/Attempt');
const User = require('../models/User');

router.get('/:quizId', async (req, res) => {
  try {
    const quizId = req.params.quizId;

    // Fetch top attempts by score for this quiz
    const attempts = await Attempt.find({ quizId })
      .sort({ score: -1 })
      .limit(10)
      .populate('userId', 'username');

    const leaderboard = attempts.map((attempt) => ({
      username: attempt.userId.username,
      score: attempt.score,
    }));

    res.json(leaderboard);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
