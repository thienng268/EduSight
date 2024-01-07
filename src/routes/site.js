const express = require('express');
const router = express.Router();

const siteControllers = require('../app/controllers/SiteController');
//newControllers.index;
router.use('/search', siteControllers.search);
router.use('/theliem', siteControllers.theliem);
router.use('/find', siteControllers.find);
router.use('/', siteControllers.index);


module.exports = router;