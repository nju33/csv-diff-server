const express = require('express');
const url = require('url');
const verifyParams = require('./verify-params');

module.exports = nextApp => {
  // eslint-disable-next-line new-cap
  const router = express.Router();

  router.use(verifyParams(['pat', 'filename', 'diff']));

  router.get('*', (req, res) => {
    const {query} = url.parse(req.url, true);
    return nextApp.render(req, res, '/', {...query});
  });

  return router;
};
