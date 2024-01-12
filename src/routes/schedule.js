const express = require('express');
const multer = require('multer');
const router = express.Router();
const scheduleController = require('../app/controllers/ScheduleController');
const upload = multer({ dest: 'uploads/' });

//router.post('/process', upload.single('file'), scheduleController.processSchedule);
//router.use('/view', scheduleController.view); // Thêm một route cho trang xem
router.get('/edit_schedule', scheduleController.editSchedule);
router.post('/update_schedule', scheduleController.post_edit);
router.get('/export-to-excel', scheduleController.exportToExcel);
router.get('/teacher', scheduleController.index_teacher);
router.get('/teacher/:teacherId', scheduleController.scheduleFilter_teacher);
router.get('/:teacherId', scheduleController.scheduleFilter);


router.use('/', scheduleController.index);

module.exports = router;