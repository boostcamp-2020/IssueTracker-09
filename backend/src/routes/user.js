// Dependencies
const express = require('express');
const { githubAuth } = require('../passport/github');

const router = express.Router();

router.get('/github', githubAuth);
router.get('/github/callback', githubAuth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
