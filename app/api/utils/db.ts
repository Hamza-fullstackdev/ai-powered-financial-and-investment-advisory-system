import mongoose from 'mongoose';
import { config } from '@/app/api/utils/env-config';

const mongoDbConnection = config.mongoDb;

if (!mongoDbConnection) {
  throw new Error('Please define the MONGODB_URI environment variable inside envoirement file');
}

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(mongoDbConnection, {
      dbName: config.dbName,
      bufferCommands: false,
    });

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};
