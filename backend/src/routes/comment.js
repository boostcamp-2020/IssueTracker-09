// Dependencies
const express = require('express');

// Controller
const comment = require('../controller/comment');

const router = express.Router();

router.post('/', comment.create);

router.delete('/', comment.remove);

router.put('/', comment.update);

module.exports = router;
