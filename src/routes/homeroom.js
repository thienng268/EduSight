const express = require('express');
const router = express.Router();


const homeroomController = require('../app/controllers/HomeroomController');

router.post('/update/behaviour', homeroomController.updateBehaviour);
router.use('/', homeroomController.index);


module.exports = router;