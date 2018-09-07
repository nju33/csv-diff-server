const express = require('express');
const verifyParams = require('./verify-params');
const getContent = require('./get-content');
const timeout = require('connect-timeout');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(verifyParams(['pat', 'filename', 'ref']));
router.use(timeout(1000 * 60 * 60));

router.get('/table', async (req, res) => {
  const content = await getContent(req.query);

  res.json({content});
});

module.exports = router;
