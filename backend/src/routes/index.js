// Dependencies
const express = require('express');

// Router
const userRouter = require('./user');
const commentRouter = require('./comment');
const imageRouter = require('./image');
const issueRouter = require('./issue');
const labelRouter = require('./label');
const milestoneRouter = require('./milestone');

const router = express.Router();

router.use('/user', userRouter);
router.use('/comment', commentRouter);
router.use('/image', imageRouter);
router.use('/issue', issueRouter);
router.use('/label', labelRouter);
router.use('/milestone', milestoneRouter);

module.exports = router;
