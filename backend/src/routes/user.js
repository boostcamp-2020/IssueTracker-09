// Dependencies
const express = require('express');
const passport = require('passport');
const githubAuth = require('./middleware/git-auth');
const jwtAuth = require('./middleware/jwt-auth');

// Controller
const User = require('../controller/user');

const router = express.Router();

router.get('/', jwtAuth, User.getUser);

router.get('/users', User.getUsers);

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', githubAuth, User.gitHubLogin);

router.post('/apple', User.iOSAppleLogin);

router.post('/github/ios', User.iOSGitHubLogin);

module.exports = router;
