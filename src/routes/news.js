const express = require('express');
const router = express.Router();

const newControllers = require('../app/controllers/NewControllers');
//newControllers.index;
router.use('/', newControllers.index);


module.exports = router;