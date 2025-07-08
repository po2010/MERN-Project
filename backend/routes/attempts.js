const express = require('express');
const router = express.Router();
const Attempt = require('../models/Attempt');

router.post('/', async (req, res) => {
  try {
    const attempt = new Attempt(req.body);
    await attempt.save();
    res.status(201).json({ message: 'Attempt saved' });
  } catch (err) {
    console.error('Failed to save attempt:', err);
    res.status(500).json({ error: 'Failed to save attempt' });
  }
});

router.get('/quiz/:quizId', async (req, res) => {
  try {
    const attempts = await Attempt.find({ quizId: req.params.quizId });
    res.json(attempts);
  } catch (err) {
    console.error('Error fetching attempts by quizId:', err);
    res.status(500).json({ message: 'Failed to fetch attempts for quiz' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const attempts = await Attempt.find({ userId: req.params.userId });
    res.json(attempts);
  } catch (err) {
    console.error('Error fetching attempts:', err);
    res.status(500).json({ message: 'Failed to fetch attempts' });
  }
});

module.exports = router;
