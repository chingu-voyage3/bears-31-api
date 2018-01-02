const express = require('express');
// const groupsRouter = require('./groups');
// const meetingsRouter = require('./meetings');
const usersRouter = require('./users');

const router = express.Router();

// router.use(groupsRouter);
// router.use(meetingsRouter);
router.use(usersRouter);

module.exports = router;
