// Dependencies
const express = require('express');

// Controller
const { createComment } = require('../controller/comment');

const router = express.Router();

router.post('/', createComment);

module.exports = router;
