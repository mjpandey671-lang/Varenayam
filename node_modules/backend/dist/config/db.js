"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let isConnected = false; // track the connection
const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    if (mongoose_1.default.connection.readyState >= 1) {
        isConnected = true;
        console.log('MongoDB connection readyState >= 1');
        return;
    }
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/varenayam');
        isConnected = true;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        }
        else {
            console.error(`An unexpected error occurred`);
        }
        // Don't exit process in serverless, just throw error
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
        else {
            throw error;
        }
    }
};
exports.default = connectDB;
