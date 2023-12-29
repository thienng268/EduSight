const express = require('express');
const router = express.Router();

const scheduleController = require('../app/controllers/ScheduleController');
router.use('/view', scheduleController.index);
router.use('/', scheduleController.view);
//router.post('/', scheduleController.hamxuly);

module.exports = router;