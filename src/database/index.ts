import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { getMongoUri } from '../utilities/mongo-utilities';

dotenv.config();

const mongoUri = getMongoUri();

const setupDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB with mongoUri: ${mongoUri}`);
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    throw err; // Re-throw the error to be handled or logged at the application level
  }
};

export default setupDatabase;
