const express = require('express');
const router = express.Router();

const multer = require('multer');
// Sử dụng memoryStorage để tệp được lưu trong bộ nhớ tạm thời
const upload = multer({ storage: multer.memoryStorage() });


const studentControllers = require('../app/controllers/StudentController');
//newControllers.index;

router.post('/create', studentControllers.create);

module.exports = router;