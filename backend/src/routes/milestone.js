// Dependencies
const express = require('express');
const jwtAuth = require('./middleware/jwt-auth');

// Controller
const milestone = require('../controller/milestone');

const router = express.Router();

router.post('/', milestone.create);

router.get('/', milestone.read);
router.get('/id', milestone.readById);

router.put('/', milestone.update);

router.delete('/', milestone.remove);

module.exports = router;
