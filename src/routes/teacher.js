const express = require('express');
const router = express.Router(express.json());


const teacherController = require('../app/controllers/TeacherController');

router.post('/add', teacherController.addTeacher);
router.get('/view', teacherController.show);
router.use('/', teacherController.index);


module.exports = router;