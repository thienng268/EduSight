const express = require('express');
const router = express.Router();


const gradeController = require('../app/controllers/GradeController');


router.get('/view', gradeController.show);
router.use('/', gradeController.index);


module.exports = router;