
const siteRouter = require('./site');
const scheduleRouter = require('./schedule');
const gradeRouter = require('./grade');
const classRouter = require('./class');
const authRouter = require('./auth');
const teacherRouter = require('./teacher');
const profileRouter = require('./profile');

function route(app)
{
    app.use('/teacher', teacherRouter);
    app.use('/class', classRouter);
    app.use('/grade', gradeRouter);
    app.use('/schedule', scheduleRouter);
    app.use('/auth', authRouter);
    app.use('/profile', profileRouter);
    app.use('/', siteRouter);
}

module.exports = route;