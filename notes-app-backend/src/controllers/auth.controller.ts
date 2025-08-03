import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({
      _id: user.id,
      username: user.username,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select('+password');

  if (user && (await bcrypt.compare(password, user.password!))) {
    res.json({
      _id: user.id,
      username: user.username,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};