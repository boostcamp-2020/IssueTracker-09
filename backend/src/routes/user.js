// Dependencies
const express = require('express');
const passport = require('passport');
const githubAuth = require('./middleware/git-auth');
const jwtAuth = require('./middleware/jwt-auth');

// Controller
const userController = require('../controller/user');

const router = express.Router();

router.get('/', jwtAuth, userController.getUser);

router.get('/users', jwtAuth, userController.getUsers);

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', githubAuth, userController.gitHubLogin);

router.post('/apple', userController.iOSAppleLogin);

router.post('/github/ios', userController.iOSGitHubLogin);

router.post('/logout', jwtAuth, userController.logout);

module.exports = router;
