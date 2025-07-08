const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Question = require('../models/Question'); // 


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

    
    const questionDocs = await Question.insertMany(questions);
    const questionIds = questionDocs.map(q => q._id);

    
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


router.get('/published/all', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isPublished: true });
    res.json(quizzes);
  } catch (err) {
    console.error('Error fetching published quizzes:', err);
    res.status(500).json({ error: 'Failed to fetch published quizzes' });
  }
});


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

