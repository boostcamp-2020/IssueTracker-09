// Dependencies
const express = require('express');
const githubAuth = require('./middleware/git-auth');
const jwtAuth = require('./middleware/jwt-auth');

// Controller
const userController = require('../controller/user');

const router = express.Router();

router.get('/', jwtAuth, userController.getUser);

router.get('/users', jwtAuth, userController.getUsers);

router.post('/github', githubAuth, userController.gitHubLogin);

router.post('/apple', userController.iOSAppleLogin);

router.post('/github/ios', userController.iOSGitHubLogin);

router.post('/logout', jwtAuth, userController.logout);

module.exports = router;
