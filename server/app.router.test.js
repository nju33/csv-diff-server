const request = require('supertest');
const express = require('express');
const router = require('./app.router');

describe('app.router.js', () => {
  let app;
  beforeEach(() => {
    const server = express();
    server.use(router({render: (req, res) => res.end('hoge')}));
    app = request(server);
  });

  test('params', async () => {
    const res = await app.get('/');

    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveLength(3);
  });

  test('set diff param in bad format', async () => {
    const res = await app.get('/?pat=a&filename=b&diff=foo');

    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveLength(1);
  });

  it('has required params, and in good format', async () => {
    const res = await app.get('/?pat=a&filename=b&diff=foo...bar');

    expect(res.status).toBe(200);
    expect(res.text).toBe('hoge');
  });
});
