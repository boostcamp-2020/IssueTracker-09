// Dependencies
const express = require('express');

// Controller
const issueController = require('../controller/issue');

const router = express.Router();

router.get('/', issueController.read);

router.post('/', issueController.create);

router.put('/title/:id');

router.put('/content/:id');

router.put('/assignee/:id');

router.put('/label/:id');

router.delete('/:id', issueController.remove);

module.exports = router;