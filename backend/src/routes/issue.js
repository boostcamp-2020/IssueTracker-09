// Dependencies
const express = require('express');
const issueController = require('../controller/issue');

const router = express.Router();

router.get('/', issueController.read);

router.post('/');

router.put('/title/:id');

router.put('/content/:id');

router.put('/assignee/:id');

router.put('/label/:id');

router.delete('/:id');

module.exports = router;
