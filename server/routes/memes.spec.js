/* eslint-disable no-undef */
const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Meme = require('../models/meme.model');
const app = require('../app');
const { mockData } = require('../lib/utils');

describe('Meme tests', () => {
  beforeAll(async (done) => {
    await request(app).post('/api/auth/signup').send(mockData.signUp);
    await request(app).post('/api/auth/signup').send(mockData.signUp2);
    const res = await request(app).post('/api/auth/login').send(mockData.signUp);
    const res2 = await request(app).post('/api/auth/login').send(mockData.signUp2);
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
    const res = await request(app).get('/api/memes');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('count');
    expect(res.body.data).toHaveProperty('memes');
    done();
  });
  it('POST/ user should create a meme', async (done) => {
    const res = await request(app).post('/api/memes')
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
  it('POST/ user should not create a meme when not logged in', async (done) => {
    const res = await request(app).post('/api/memes')
      .send(mockData.memeBody);
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('error');
    done();
  });
  it('POST/ user should not create an empty meme', async (done) => {
    const res = await request(app).post('/api/memes')
      .set('Authorization', `Bearer ${mockData.testToken}`)
      .send({});
    expect(res.status).toEqual(500);
    expect(res.body).toHaveProperty('error');
    done();
  });
  it('GET/ user should get a meme', async (done) => {
    const res = await request(app).get(`/api/memes/${mockData.memeId}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('meme');
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data).toHaveProperty('author');
    done();
  });
  it('GET/ user should not get a non-existing meme', async (done) => {
    const res = await request(app).get('/api/memes/5f52704a8165a55d01efd0bd');
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty('error');
    done();
  });
  it('GET/ user should not get a meme with invalid id', async (done) => {
    const res = await request(app).get(`/api/memes/${mockData.memeId.split('')[0]}`);
    expect(res.status).toEqual(500);
    expect(res.body).toHaveProperty('error');
    done();
  });
  it('POST/ other user should create another meme', async (done) => {
    const res = await request(app).post('/api/memes')
      .set('Authorization', `Bearer ${mockData.test2Token}`)
      .send(mockData.memeBody);
    mockData.memeId2 = res.body.data._id;
    done();
  });
  it('PATCH/ user should update a meme', async (done) => {
    const res = await request(app).patch(`/api/memes/${mockData.memeId}`)
      .set('Authorization', `Bearer ${mockData.testToken}`)
      .send(mockData.memeBodyUpdate);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
    done();
  });
  it('PATCH/ user should not update a meme with invalid id', async (done) => {
    const res = await request(app).patch(`/api/memes/${mockData.memeId.split('')[0]}`)
      .set('Authorization', `Bearer ${mockData.testToken}`)
      .send(mockData.memeBodyUpdate);
    expect(res.status).toEqual(500);
    expect(res.body).toHaveProperty('error');
    done();
  });
  it('PATCH/ user should not update another\'s meme', async (done) => {
    const res = await request(app).patch(`/api/memes/${mockData.memeId2}`)
      .set('Authorization', `Bearer ${mockData.testToken}`)
      .send(mockData.memeBodyUpdate);
    expect(res.status).toEqual(403);
    expect(res.body).toHaveProperty('error');
    done();
  });
  it('DELETE/ user should delete a meme', async (done) => {
    const res = await request(app).delete(`/api/memes/${mockData.memeId}`)
      .set('Authorization', `Bearer ${mockData.testToken}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('message');
    done();
  });
  it('DELETE/ user should not delete a meme with invalid id', async (done) => {
    const res = await request(app).delete(`/api/memes/${mockData.memeId.split('')[0]}`)
      .set('Authorization', `Bearer ${mockData.testToken}`);
    expect(res.status).toEqual(500);
    expect(res.body).toHaveProperty('error');
    done();
  });
  it('DELETE/ user should not delete another\'s meme', async (done) => {
    const res = await request(app).delete(`/api/memes/${mockData.memeId2}`)
      .set('Authorization', `Bearer ${mockData.testToken}`);
    expect(res.status).toEqual(403);
    expect(res.body).toHaveProperty('error');
    done();
  });
});
