import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import * as dotenv from 'dotenv';

const app = express();
const port = 3000;
const dbName = 'myAppDb';

dotenv.config();

const envType = process.env.ENV_TYPE || 'local';
const mongoUriMap: { [key: string]: string } = {
  'local': `mongodb://mongo:27017/${dbName}`,
  'circleci': 'mongodb://mongo:27017/${dbName}',
  // Add other environments as needed
};

const mongoUri = mongoUriMap[envType];
mongoose.connect(mongoUri)
  .then(() => console.log(`Connected to MongoDB in ${envType} environment`))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World-d-d-d!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(express.json()); 

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
});

const User = model('User', userSchema);

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});



