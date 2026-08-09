"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// @desc    Get user statistics for dashboard
// @route   GET /api/admin/stats/users
// @access  Private/Admin
router.get('/stats/users', authMiddleware_1.protect, authMiddleware_1.admin, async (req, res) => {
    try {
        const totalUsers = await User_1.default.countDocuments({});
        // Let's define "recently active" as logged in within the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activeUsers = await User_1.default.countDocuments({
            lastLogin: { $gte: thirtyDaysAgo }
        });
        res.json({
            totalUsers,
            activeUsers
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
});
exports.default = router;
