const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Question = require('../models/Question'); // ✅ Import the Question model

// Create a quiz
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      startTime,
      endTime,
      isPrivate,
      accessPassword,
      isPublished,
      userId, 
      timeLimit,
      questions
    } = req.body;

    // Save questions
    const questionDocs = await Question.insertMany(questions);
    const questionIds = questionDocs.map(q => q._id);

    // Create and save quiz
    const quiz = new Quiz({
      title,
      description,
      category,
      startTime,
      endTime,
      isPrivate,
      accessPassword,
      isPublished,
      timeLimit,
      createdBy: userId,
      questions: questionIds
    });

    await quiz.save();

    res.status(201).json({ message: 'Quiz saved successfully' });
  } catch (error) {
    console.error('Error saving quiz:', error);
    res.status(500).json({ message: 'Failed to save quiz' });
  }
});


// ✅ Get all quizzes (excluding full question details)
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

router.get('/creator/:userId', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.params.userId });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch your quizzes' });
  }
});

// ✅ Get only published quizzes
router.get('/published/all', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isPublished: true });
    res.json(quizzes);
  } catch (err) {
    console.error('Error fetching published quizzes:', err);
    res.status(500).json({ error: 'Failed to fetch published quizzes' });
  }
});

// ✅ Get full quiz (with questions populated)
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz by ID:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});




module.exports = router;

