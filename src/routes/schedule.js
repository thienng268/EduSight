const express = require('express');
const multer = require('multer');
const router = express.Router();
const scheduleController = require('../app/controllers/ScheduleController');
const upload = multer({ dest: 'uploads/' });

router.post('/process', upload.single('file'), scheduleController.processSchedule);
//router.use('/view', scheduleController.view); // Thêm một route cho trang xem
router.get('/view', scheduleController.view);
router.use('/list', scheduleController.list);
router.use('/', scheduleController.index);

module.exports = router;