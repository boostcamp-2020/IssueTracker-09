// Dependencies
const express = require('express');

// Controller
const milestoneController = require('../controller/milestone');

const router = express.Router();

router.post('/', milestoneController.create);

router.get('/', milestoneController.read);

router.get('/:id', milestoneController.readById);

router.put('/:id', milestoneController.update);

router.put('/state/:id', milestoneController.updateState);

router.delete('/:id', milestoneController.remove);

module.exports = router;
