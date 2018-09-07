require('dotenv').config();
const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');
const appRouter = require('./app.router');
const apiRouter = require('./api.router');
const signale = require('signale');
const next = require('next');

const nextApp = next({dev: process.env.NODE_ENV !== 'production'});
// Failed to load resource: the server responded with a status of 400 (Bad Request) :3678/_next/-/page/_app.js:1
// Failed to load resource: the server responded with a status of 400 (Bad Request) :3678/_next/-/page/_error.js:1
// Failed to load resource: the server responded with a status of 400 (Bad Request) manifest.js:1
// Failed to load resource: the server responded with a status of 400 (Bad Request) main.js:1
const handleNext = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  app.use(bodyParser.json());
  app.use('/api/v1/', apiRouter);
  app.get('*', (req, res, next) => {
    const {pathname} = url.parse(req.url);
    if (pathname === '/') {
      return next();
    }

    return handleNext(req, res);
  });
  app.use(appRouter(nextApp));
  app.listen(3678);
  signale.info('URL: ', `http://localhost:3678`);
  signale.start('App');
});
