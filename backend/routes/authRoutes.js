import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/user.js';

const router = express.Router();

// Register route
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to hash password' });
    }
    createUser(email, hashedPassword, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to create user' });
      }
      res.status(201).json({ message: 'User created' });
    });
  });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  findUserByEmail(email, (err, users) => {
    if (err || !users.length) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = users[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

export default router;
