const xlsx = require('xlsx');
class ScheduleController
{

    // [GET] /
    index(req, res) {
        res.render('scheduleview');

    }
    hamxuly(req,res){
        //sadsdasdasda
    }
    view(req, res) {
        res.render('schedulecreate');
    }
}

module.exports = new ScheduleController;