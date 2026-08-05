import express from 'express';
import User from '../models/User';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    // If empty, let's seed the initial 4 users
    if (users.length === 0) {
      const initialUsers = [
        { name: 'Rahul Sharma', email: 'rahul.s@example.com', role: 'Customer', joinDate: '2023-10-15' },
        { name: 'Priya Patel', email: 'priya.p@example.com', role: 'Customer', joinDate: '2023-11-02' },
        { name: 'Amit Kumar', email: 'amit.k@example.com', role: 'Admin', joinDate: '2023-01-10' },
        { name: 'Sneha Gupta', email: 'sneha.g@example.com', role: 'Customer', joinDate: '2024-02-28' },
      ];
      const insertedUsers = await User.insertMany(initialUsers);
      return res.json(insertedUsers);
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
