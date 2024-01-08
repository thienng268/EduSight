const express = require('express');
const router = express.Router();

const authControllers = require('../app/controllers/AuthController');
//newControllers.index;
router.use('/account', authControllers.account);
router.post('/create_account', authControllers.create_account);
router.post('/disable_account', authControllers.disable_account);
router.post('/enable_account', authControllers.enable_account);

module.exports = router;