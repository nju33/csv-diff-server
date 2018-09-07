const express = require('express');
const verifyParams = require('./verify-params');
const getContent = require('./get-content');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(verifyParams(['pat', 'filename', 'ref']));

router.get('/table', async (req, res) => {
  const content = await getContent(req.query);

  res.json({content});
});

module.exports = router;
