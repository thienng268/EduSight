class SiteController
{
    // [GET] /
    index(req, res) {
        res.render('home');
    }

    // [GET] /news/:slug
    search(req, res) {
        res.render('search');
    }
    theliem(req, res) {
        res.render('grade'); // Explicitly set the layout
        //res.render('noti/failure', { layout: 'pop_up' });
    }
}

module.exports = new SiteController;