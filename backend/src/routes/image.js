// Dependencies
const express = require('express');
const upload = require('../lib/utils/multer').uploads;

// Controller
const imageController = require('../controller/image');

const router = express.Router();

router.post('/', upload, imageController.upload);

module.exports = router;
