"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
    },
    mobileNumber: {
        type: String,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Customer', 'Admin'],
        default: 'Customer',
    },
    joinDate: {
        type: String,
        default: () => new Date().toISOString().split('T')[0],
    },
    lastLogin: {
        type: Date,
    }
}, {
    timestamps: true,
});
// Format returned JSON to replace _id with id to match frontend types
userSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
    }
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
