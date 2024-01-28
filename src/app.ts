// This file is responsible for configuring the server (and src/index.ts is responsible for starting it).

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import setupDatabase from './database';
import { Schema, model } from 'mongoose';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

const app = express();

setupDatabase().then(() => {  
  // TODO: remove this log, since we log a similar message in database/index.ts
  console.log('in app.ts, Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
  // TODO: implement error handling
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(express.json()); 



// Routes
app.use(userRoutes);

export default app;
