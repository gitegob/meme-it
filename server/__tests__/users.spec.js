/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import User from '../models/user.model';
import Meme from '../models/meme.model';
import app from '../app';
import mockData from '../helpers/utils';

describe('User tests', () => {
  afterAll(async (done) => {
    await Meme.deleteMany({});
    await User.deleteMany({});
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
  it('POST/ should not login a non-existing user', async (done) => {
    const res = await request(app).post('/api/auth/login').send(mockData.signUp2);
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('error');
    done();
  });
  it('POST/ should not login a user with incorrect password', async (done) => {
    const res = await request(app).post('/api/auth/login').send(mockData.logInIncPwd);
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('error');
    done();
  });
});
