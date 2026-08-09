import mongoose from 'mongoose';

let isConnected = false; // track the connection

const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    console.log('MongoDB connection readyState >= 1');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/varenayam');
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`An unexpected error occurred`);
    }
    // Don't exit process in serverless, just throw error
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    } else {
      throw error;
    }
  }
};

export default connectDB;
