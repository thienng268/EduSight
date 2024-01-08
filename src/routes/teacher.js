const express = require('express');
const router = express.Router();


const teacherController = require('../app/controllers/TeacherController');


router.get('/view', teacherController.show);
router.use('/', teacherController.index);


module.exports = router;