// Dependencies
const express = require('express');
const { githubAuth } = require('../passport/github');
const { gitHubLogin } = require('../controller/user');

const router = express.Router();
router.get('/github', githubAuth);
router.get('/callback', githubAuth, gitHubLogin);

module.exports = router;
