// Dependencies
const express = require('express');

// Controller
const comment = require('../controller/comment');

const router = express.Router();

router.post('/', comment.create);

router.delete('/', comment.remove);

module.exports = router;
