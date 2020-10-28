// Dependencies
const express = require('express');
const jwtAuth = require('./middleware/jwt-auth');

// Controller
const milestone = require('../controller/milestone');

const router = express.Router();

// router.get('/', jwtAuth, Milestone.getMilestone);

// router.post('/', jwtAuth, Milestone.setMilestone);

// router.put('/', jwtAuth, Milestone.updateMilestone);

// router.delete('/', jwtAuth, Milestone.removeMilestone);

router.post('/', jwtAuth, milestone.create);

router.get('/', jwtAuth, milestone.read);

module.exports = router;
