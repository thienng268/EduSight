const express = require('express');
const router = express.Router();

const multer = require('multer');
// Sử dụng memoryStorage để tệp được lưu trong bộ nhớ tạm thời
const upload = multer({ storage: multer.memoryStorage() });


const profileControllers = require('../app/controllers/ProfileController');
//newControllers.index;

router.use('/your', profileControllers.profile_other);
router.post('/loading_profile_other', upload.single('file'), profileControllers.loading_profile_other);
router.post('/loading_profile', upload.single('file'), profileControllers.loading_profile);
router.use('/', profileControllers.index);

module.exports = router;