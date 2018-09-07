const request = require('supertest');
const express = require('express');
const router = require('./api.router');

jest.mock('./api.router');

describe('api.router.js', () => {
  let app;
  beforeEach(() => {
    const server = express();
    server.use(router);
    app = request(server);
  });

  test('params', async () => {
    const res = await app.get('/table');

    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveLength(3);
  });

  it('has required params, and in good format', async () => {
    const res = await app.get('/table?pat=a&filename=b&ref=foo');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({content: 'foo'});
  });
});
