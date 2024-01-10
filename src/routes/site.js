const express = require('express');
const router = express.Router();

const siteControllers = require('../app/controllers/SiteController');
//newControllers.index;
router.use('/search', siteControllers.search);
router.use('/theliem', siteControllers.theliem);
router.use('/find', siteControllers.find);
router.use('/dashboard', siteControllers.dashboard);
router.use('/dashboard_teacher', siteControllers.dashboard_teacher);
router.use('/dashboard_manager', siteControllers.dashboard_manager);
router.use('/', siteControllers.signin);


module.exports = router;