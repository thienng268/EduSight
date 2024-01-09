const violationRouter = require('./violation');
const homeroomRouter = require('./homeroom');
const siteRouter = require('./site');
const scheduleRouter = require('./schedule');
const gradeRouter = require('./grade');
const classRouter = require('./class');
const authRouter = require('./auth');
const teacherRouter = require('./teacher');

function route(app)
{
    app.use('/homeroom', homeroomRouter);
    app.use('/violation', violationRouter);
    app.use('/teacher', teacherRouter);
    app.use('/class', classRouter);
    app.use('/grade', gradeRouter);
    app.use('/schedule', scheduleRouter);
    app.use('/auth', authRouter);
    app.use('/', siteRouter);
}

module.exports = route;