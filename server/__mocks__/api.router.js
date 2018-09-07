const express = require('express');
const verifyParams = require('../verify-params');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(verifyParams(['pat', 'filename', 'ref']));

router.get('/table', async (req, res) => {
  res.json({content: 'foo'});
});

module.exports = router;
