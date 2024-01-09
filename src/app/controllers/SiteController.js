const Account = require('../models/Account');
const Class = require('../models/Class');
const Event = require('../models/Event');
const Grade = require('../models/Grade');
const Manager = require('../models/Manager');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');

class SiteController
{

    async find(req, res) {
        
        /* try {
            const role = 'Teaching';
            const account = await Teacher.find({Status: role});

            const newAccount = await Account.create({Username: 'Liêm', Password: 'liem', Role: 'Teacher'});

            //const role = 'jobseeker4@gmail.com';

            //const checkEmail = await Account.findOne({Email: role});
            res.json(newAccount);
        } catch (err) {
            console.error(err); // Ghi log lỗi
            res.status(400).json({error: 'ERROR!!!'});
        } */
        //res.render('dashboard')
    }
    // [GET] /
    signin(req, res) {
        res.render('login', { layout: 'non_sb' });
    }

    dashboard(req, res) {
        res.render('dashboard');
    }

    // [GET] /news/:slug
    search(req, res) {
        res.render('search');
    }
    theliem(req, res) {
        res.render('violation'); 
        //res.render('profile', { layout: 'non_sb' });
    }
}

module.exports = new SiteController;