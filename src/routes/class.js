const express = require('express');
const router = express.Router();


const classController = require('../app/controllers/ClassController');


router.get('/view', classController.show);
router.use('/', classController.index);


module.exports = router;