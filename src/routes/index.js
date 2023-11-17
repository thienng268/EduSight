const newRouter = require('./news');

function route(app)
{
    app.get('/', (req, res) => {
        res.render('home')
    })
      
    //app.get('/news', (req, res) => {
    //    res.render('news')
    //})

    app.use('/news', newRouter);
}

module.exports = route;