const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'your_jwt_secret_key'; // Change in production

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ msg: 'Missing fields' });

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(409).json({ msg: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();

  res.status(201).json({ msg: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token, user: { username: user.username, role: user.role } });
};
