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
        
        try {
            /* const role = 'Teaching';
            const account = await Teacher.find({Status: role});

            const newAccount = await Subject.create({StartTime: '12/12/2023'});

            //const role = 'jobseeker4@gmail.com';

            //const checkEmail = await Account.findOne({Email: role});
            res.json(newAccount); */
        } catch (err) {
            console.error(err); // Ghi log lỗi
            res.status(400).json({error: 'ERROR!!!'});
        }
    }
    // [GET] /
    index(req, res) {
        res.render('home');
    }

    // [GET] /news/:slug
    search(req, res) {
        res.render('search');
    }
    theliem(req, res) {
        res.render('teacher'); 
        //res.render('noti/failure', { layout: 'pop_up' });
    }
}

module.exports = new SiteController;