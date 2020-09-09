/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import request from 'supertest';
import { connection } from 'mongoose';
import app from '../app';

describe('App tests', () => {
  afterAll(async (done) => {
    connection.close();
    done();
  });
  it('GET/ should send a welcome message', async (done) => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
    done();
  });
  it('GET/ should send a not found message', async (done) => {
    const res = await request(app).get('/jibberjabber');
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty('error');
    done();
  });
});
