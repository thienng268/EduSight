class NewControllers
{

    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('New Detail');
    }
}

module.exports = new NewControllers;