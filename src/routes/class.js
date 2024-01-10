const express = require('express');
const router = express.Router();


const classController = require('../app/controllers/ClassController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Chọn thư mục tạm cho các file tải lên

router.post('/create_class', upload.single('file'), classController.create_class);

router.post('/create', classController.create);
router.get('/view', classController.show);
router.use('/', classController.index);


module.exports = router;