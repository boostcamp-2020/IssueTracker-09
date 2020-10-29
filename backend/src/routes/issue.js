// Dependencies
const express = require('express');

// Controller
const issueController = require('../controller/issue');

const router = express.Router();

router.delete('/:id', issueController.remove);

module.exports = router;
