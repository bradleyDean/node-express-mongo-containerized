import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../database/models/User';

// Ensure database is in a known state before and after tests
beforeEach(async () => {
  // Clear the users collection before each test
  await User.deleteMany({});
});

afterAll(async () => {
  // Disconnect from the database after all tests
  await mongoose.disconnect();
});

describe('POST /users', () => {
  it('should create a new user and save it to the database', async () => {
    const newUser = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    };

    // Make a POST request to create a new user
    const response = await request(app)
      .post('/users')
      .send(newUser)
      .expect(201);

    // Check the response data
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);

    // Verify that the user was saved in the database
    const savedUser = await User.findOne({ email: newUser.email });
    expect(savedUser).toBeDefined();
    expect(savedUser?.name).toBe(newUser.name);
  });
});
