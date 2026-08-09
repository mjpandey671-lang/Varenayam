"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderItemSchema = new mongoose_1.default.Schema({
    product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    size: { type: String },
    color: { type: String }
});
const addressSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
});
const orderSchema = new mongoose_1.default.Schema({
    date: { type: Date, default: Date.now },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        required: true,
        enum: ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing'
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['UPI', 'COD'],
        default: 'COD'
    },
    total: { type: Number, required: true },
    items: [orderItemSchema],
    shippingAddress: addressSchema
}, {
    timestamps: true
});
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
