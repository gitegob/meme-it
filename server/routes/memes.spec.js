/* eslint-disable no-undef */
const supertest = require('supertest');
const mongoose = require('mongoose');
// const debug = require('debug')('app:test:meme.spec');
const User = require('../models/user.model');
const app = require('../app');
const { mockData } = require('../lib/utils');
const Meme = require('../models/meme.model');

const request = supertest(app);
describe('Meme tests', () => {
  beforeAll(async (done) => {
    await request.post('/api/auth/signup').send(mockData.signUp);
    await request.post('/api/auth/signup').send(mockData.signUp2);
    const res = await request.post('/api/auth/login').send(mockData.signUp);
    const res2 = await request.post('/api/auth/login').send(mockData.signUp2);
    mockData.testToken = res.body.data.token;
    mockData.test2Token = res2.body.data.token;
    done();
  });
  afterAll(async (done) => {
    await User.deleteMany({});
    await Meme.deleteMany({});
    mongoose.connection.close();
    done();
  });
  it('GET/ user should get all memes', async (done) => {
    const res = await request.get('/api/memes');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('count');
    expect(res.body.data).toHaveProperty('memes');
    done();
  });
  it('POST/ user should create a meme', async (done) => {
    const res = await request.post('/api/memes')
      .set('Authorization', `Bearer ${mockData.testToken}`)
      .send(mockData.memeBody);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('meme');
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data).toHaveProperty('author');
    mockData.memeId = res.body.data._id;
    done();
  });
  it('GET/ user should get a meme', async (done) => {
    const res = await request.get(`/api/memes/${mockData.memeId}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('meme');
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data).toHaveProperty('author');
    done();
  });
  it('POST/ other user should create another meme', async (done) => {
    const res = await request.post('/api/memes')
      .set('Authorization', `Bearer ${mockData.test2Token}`)
      .send(mockData.memeBody);
    mockData.memeId2 = res.body.data._id;
    done();
  });
  it('PATCH/ user should update a meme', async (done) => {
    const res = await request.patch(`/api/memes/${mockData.memeId}`)
      .set('Authorization', `Bearer ${mockData.testToken}`)
      .send(mockData.memeBodyUpdate);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
    done();
  });
  it('PATCH/ user should not update another\'s meme', async (done) => {
    const res = await request.patch(`/api/memes/${mockData.memeId2}`)
      .set('Authorization', `Bearer ${mockData.testToken}`)
      .send(mockData.memeBodyUpdate);
    expect(res.status).toEqual(403);
    expect(res.body).toHaveProperty('error');
    done();
  });
  it('DELETE/ user should delete a meme', async (done) => {
    const res = await request.delete(`/api/memes/${mockData.memeId}`)
      .set('Authorization', `Bearer ${mockData.testToken}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('message');
    done();
  });
  it('DELETE/ user should not delete another\'s meme', async (done) => {
    const res = await request.delete(`/api/memes/${mockData.memeId2}`)
      .set('Authorization', `Bearer ${mockData.testToken}`);
    expect(res.status).toEqual(403);
    expect(res.body).toHaveProperty('error');
    done();
  });
});
