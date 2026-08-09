"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_1 = __importDefault(require("../models/Order"));
const router = express_1.default.Router();
// GET all orders (for admin)
router.get('/', async (req, res) => {
    try {
        // Populate product details in items and user details
        const orders = await Order_1.default.find({}).populate('items.product').populate('user').sort({ date: -1 });
        const mappedOrders = orders.map(o => {
            const orderObj = o.toObject();
            orderObj.id = orderObj._id;
            return orderObj;
        });
        res.json(mappedOrders);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
// POST create an order (for user checkout)
router.post('/', async (req, res) => {
    try {
        const order = new Order_1.default(req.body);
        const createdOrder = await order.save();
        const orderObj = createdOrder.toObject();
        orderObj.id = orderObj._id;
        res.status(201).json(orderObj);
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid order data', error });
    }
});
// PUT update order status (for admin)
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order_1.default.findById(req.params.id);
        if (order) {
            order.status = status;
            const updatedOrder = await order.save();
            const orderObj = updatedOrder.toObject();
            orderObj.id = orderObj._id;
            res.json(orderObj);
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
// DELETE an order (for admin)
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order_1.default.findById(req.params.id);
        if (order) {
            await Order_1.default.findByIdAndDelete(req.params.id);
            res.json({ message: 'Order removed' });
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.default = router;
