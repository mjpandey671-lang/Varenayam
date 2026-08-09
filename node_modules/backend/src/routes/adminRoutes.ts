import express from 'express';
import User from '../models/User';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// @desc    Get user statistics for dashboard
// @route   GET /api/admin/stats/users
// @access  Private/Admin
router.get('/stats/users', protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    
    // Let's define "recently active" as logged in within the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeUsers = await User.countDocuments({
      lastLogin: { $gte: thirtyDaysAgo }
    });

    res.json({
      totalUsers,
      activeUsers
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
});

export default router;
