const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
  total: Number,
  answers: [Number],
  questions: [{
    questionText: String,
    options: [String],
    correctAnswerIndex: Number
  }],
  quizTitle: String,
  timeLimit: Number
});

module.exports = mongoose.model('Attempt', attemptSchema);
