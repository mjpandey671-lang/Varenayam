"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./config/db"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const User_1 = __importDefault(require("./models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
// Connect to Database
(0, db_1.default)().then(async () => {
    try {
        const adminEmail = process.env.VITE_ADMIN_EMAIL || 'mjpandey671@gmail.com';
        const adminPassword = process.env.VITE_ADMIN_PASSWORD || 'Pandey@555';
        const adminExists = await User_1.default.findOne({ email: adminEmail });
        if (!adminExists) {
            const salt = await bcryptjs_1.default.genSalt(10);
            const hashedPassword = await bcryptjs_1.default.hash(adminPassword, salt);
            await User_1.default.create({
                name: 'Super Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'Admin',
            });
            console.log('Admin user seeded successfully.');
        }
    }
    catch (error) {
        console.error('Error seeding admin user:', error);
    }
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: 52428800 }));
app.use(express_1.default.urlencoded({ limit: 52428800, extended: true }));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// Routes
app.use('/api/products', productRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
// Basic health-check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Backend is running correctly.' });
});
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
// Export for Vercel Serverless Function
exports.default = app;
