const express = require('express');
const router = express.Router();


const violationController = require('../app/controllers/ViolationController');

router.use(express.json());
router.post('/vio/add', violationController.addVio);
router.use('/', violationController.index);


module.exports = router;