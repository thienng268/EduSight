//const readXlsxFile = require('read-excel-file/node');

class GradeController
{
    //[GET]
    index(req, res) {
        res.render('grade');

    }
    
    // [GET] /schedule/:slug
    show(req, res) {
        res.send('New Detail');
    }
}

module.exports = new GradeController;