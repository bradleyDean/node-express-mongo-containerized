import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const dbName = 'myAppDb';
const envType = process.env.ENV_TYPE || 'local';
const mongoUriMap: { [key: string]: string } = {
  'local': `mongodb://mongo:27017/${dbName}`,
  'circleci': 'mongodb://mongo:27017/${dbName}',
  // Add other environments as needed
};
const mongoUri = mongoUriMap[envType];

const setupDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB in ${envType} environment`);
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    throw err; // Re-throw the error to be handled or logged at the application level
  }
};

export default setupDatabase;
