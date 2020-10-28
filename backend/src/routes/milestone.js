// Dependencies
const express = require('express');
const jwtAuth = require('./middleware/jwt-auth');

// Controller
const milestone = require('../controller/milestone');

const router = express.Router();

router.post('/', jwtAuth, milestone.create);

router.get('/', jwtAuth, milestone.read);

router.put('/', jwtAuth, milestone.update);

module.exports = router;
