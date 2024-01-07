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
        //res.render('teacher'); 
        res.render('login', { layout: 'non_sb' });
    }
}

module.exports = new SiteController;