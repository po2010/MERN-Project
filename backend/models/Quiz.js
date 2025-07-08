const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  timeLimit: Number,
  startTime: Date,
  endTime: Date,
  isPrivate: Boolean,
  accessPassword: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  isPublished: Boolean,
});

module.exports = mongoose.model('Quiz', quizSchema);