// Dependencies
const express = require('express');

// Controller
const comment = require('../controller/comment');

const router = express.Router();

router.post('/', comment.create);

router.get('/', comment.read);

router.get('/:id', comment.readById);

router.delete('/:id', comment.remove);

router.put('/:id', comment.update);

module.exports = router;
