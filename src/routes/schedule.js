const express = require('express');
const router = express.Router();

const scheduleController = require('../app/controllers/ScheduleController');
router.use('/:slug', scheduleController.show);
router.use('/', scheduleController.index);


module.exports = router;