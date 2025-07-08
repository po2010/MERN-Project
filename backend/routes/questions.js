const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// POST /api/questions
router.post('/', async (req, res) => {
  const { questionText, options, correctAnswerIndex } = req.body;
  console.log("Incoming question:", req.body);

  if (!questionText || !Array.isArray(options) || options.length !== 4 || correctAnswerIndex === undefined) {
    return res.status(400).json({ error: 'Invalid question format' });
  }

  try {
    const newQuestion = new Question({ questionText, options, correctAnswerIndex });
    await newQuestion.save();
    res.status(201).json({ message: 'Question saved successfully' });
  } catch (error) {
  console.error('Error saving question:', error.message, error.stack);
  res.status(500).json({ message: 'Failed to save question' });
}
});

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

module.exports = router;
