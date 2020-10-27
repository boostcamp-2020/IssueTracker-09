// Dependencies
const express = require('express');
const passport = require('passport');
const githubAuth = require('./middleware/git-auth');

// Controller
const { gitHubLogin } = require('../controller/user');

const router = express.Router();

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', githubAuth, gitHubLogin);

module.exports = router;
