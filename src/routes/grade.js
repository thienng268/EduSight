const express = require('express');
const router = express.Router();


const gradeController = require('../app/controllers/GradeController');

router.use(express.json());
router.post('/grade/update', gradeController.updateGrades);
router.get('/view', gradeController.show);
router.use('/', gradeController.index);


module.exports = router;