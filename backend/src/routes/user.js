// Dependencies
const express = require('express');
const passport = require('passport');
const githubAuth = require('./middleware/git-auth');
const jwtAuth = require('./middleware/jwt-auth');

// Controller
const User = require('../controller/user');

const router = express.Router();

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', githubAuth, User.gitHubLogin);
router.post('/apple', User.iosAppleLogin);
router.get('/', jwtAuth, User.getUser);
module.exports = router;
