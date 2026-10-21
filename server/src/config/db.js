import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/miel_portfolio';
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout if no local mongo
    });
    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB] Notice: Could not connect to MongoDB at ${uri} (${error.message}).`);
    console.warn(`[MongoDB] Operating in local memory/file-backed JSON store mode for seamless development.`);
    isConnected = false;
    return false;
  }
};

export const getIsConnected = () => isConnected;
