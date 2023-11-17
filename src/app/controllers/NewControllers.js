class NewControllers
{

    index(req, res) {
        res.render('news');
    }

}

module.exports = new NewControllers;