const Account = require('../models/Account');
const Class = require('../models/Class');
const Event = require('../models/Event');
const Grade = require('../models/Grade');
const Manager = require('../models/Manager');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');

class AuthController
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
    account(req, res) {
        res.render('account_list');
    }

    // [GET] /news/:slug
    search(req, res) {
        
    }
    
}

module.exports = new AuthController;