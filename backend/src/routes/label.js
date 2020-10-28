// Dependencies
const express = require('express');

const router = express.Router();
const Label = require('../controller/label');

router.get('/', Label.get);

router.post('/', Label.create);

router.put('/', Label.update);

router.delete('/:id', Label.remove);

module.exports = router;
