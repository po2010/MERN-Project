const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['maker', 'taker'], required: true },
  score: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
