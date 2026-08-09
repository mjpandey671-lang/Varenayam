import express from 'express';
import bcrypt from 'bcryptjs';
import * as jwtPkg from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();
const jwt = (jwtPkg as any).default || jwtPkg;

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key_change_me_in_prod', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, mobileNumber, password } = req.body;

  try {
    if (!email && !mobileNumber) {
      return res.status(400).json({ message: 'Please provide either email or mobile number' });
    }

    // Check if user exists
    let userExists;
    if (email) {
      userExists = await User.findOne({ email });
    }
    if (!userExists && mobileNumber) {
      userExists = await User.findOne({ mobileNumber });
    }

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role,
        token: generateToken(user._id as unknown as string),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { emailOrMobile, password } = req.body;

  try {
    // Find user by email or mobile
    const user = await User.findOne({
      $or: [{ email: emailOrMobile }, { mobileNumber: emailOrMobile }],
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      user.lastLogin = new Date();
      await user.save();

      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role,
        token: generateToken(user._id as unknown as string),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
});

export default router;
