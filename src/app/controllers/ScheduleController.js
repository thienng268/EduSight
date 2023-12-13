class ScheduleController
{
    // [GET] /
    index(req, res) {
        res.render('schedule');
    }
    
    // [GET] /schedule/:slug
    show(req, res) {
        res.send('New Detail');
    }
}

module.exports = new ScheduleController;