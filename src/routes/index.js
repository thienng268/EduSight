
const siteRouter = require('./site');
const scheduleRouter = require('./schedule');
const gradeRouter = require('./grade');

function route(app)
{
    app.use('/grade', gradeRouter);
    app.use('/schedule', scheduleRouter);
    app.use('/', siteRouter);
}

module.exports = route;