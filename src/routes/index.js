
const siteRouter = require('./site');
const scheduleRouter = require('./schedule');
const gradeRouter = require('./grade');
const classRouter = require('./class');
const authRouter = require('./auth');

function route(app)
{
    app.use('/class', classRouter);
    app.use('/grade', gradeRouter);
    app.use('/schedule', scheduleRouter);
    app.use('/auth', authRouter);
    app.use('/', siteRouter);
}

module.exports = route;