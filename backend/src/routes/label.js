// Dependencies
const express = require('express');

// controller
const labelController = require('../controller/label');

const router = express.Router();

router.get('/', labelController.read);

router.post('/', labelController.create);

router.put('/', labelController.update);

router.delete('/:id', labelController.remove);

module.exports = router;
