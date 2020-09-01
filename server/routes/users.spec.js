/* eslint-disable no-undef */
const request = require('supertest');
const mongoose = require('mongoose');
// const debug = require('debug')('app:test:meme.spec');
const User = require('../models/user.model');
const Meme = require('../models/meme.model');
const app = require('../app');
const { mockData } = require('../lib/utils');

describe('User tests', () => {
  afterAll(async (done) => {
    await User.deleteMany({});
    await Meme.deleteMany({});
    mongoose.connection.close();
    done();
  });
  it('POST/ should signup a user', async (done) => {
    const res = await request(app).post('/api/auth/signup').send(mockData.signUp);
    expect(res.status).toEqual(201);
    done();
  });
  it('POST/ should not signup an already existing user', async (done) => {
    const res = await request(app).post('/api/auth/signup').send(mockData.signUp);
    expect(res.status).toEqual(409);
    expect(res.body).toHaveProperty('error');
    done();
  });
  it('POST/ should login a user', async (done) => {
    const res = await request(app).post('/api/auth/login').send(mockData.signUp);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('token');
    done();
  });
  it('POST/ should not login a non-existing user user', async (done) => {
    const res = await request(app).post('/api/auth/login').send(mockData.signUp2);
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('error');
    done();
  });
});
