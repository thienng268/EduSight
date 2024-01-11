const express = require('express');
const router = express.Router();


const eventController = require('../app/controllers/EventController');

router.use(express.json());
router.post('/delete', eventController.deleteEvent);
//router.post('/event/add', eventController.addEvent);
router.use('/', eventController.index);


module.exports = router;