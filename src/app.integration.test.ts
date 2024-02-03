import request from 'supertest';
import app from './app';
import mongoose from 'mongoose';

describe('GET /', () => {
  it('responds with Hello World', done => {
    request(app)
      .get('/')
      .expect('Hello World!')
      .expect(200, done);
  });

  // TODO: create a global teardown script for handling database disconnection
  afterAll(async () => {
    await mongoose.disconnect(); // Disconnect from the database to clean up after tests
  }, 10000);
});

