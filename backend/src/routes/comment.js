// Dependencies
const express = require('express');

// Controller
const commentController = require('../controller/comment');

const router = express.Router();

router.post('/', commentController.addComment);

module.exports = router;
