const Account = require('../models/Account');
const Class = require('../models/Class');
const Event = require('../models/Event');
const Grade = require('../models/Grade');
const Manager = require('../models/Manager');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');

class StudentController
{

    async create(req, res) {
        try {
            const classId = req.query.classId;
            console.log(classId);
            //console.log(classId);
            const newStudent = new Student({
                Name: req.body.StudentName,
                Address: req.body.Address,
                ParentName: req.body.ParentName,
                ParentPhone: req.body.PhoneNumber,
                DOB: req.body.Date,
                Status: req.body.Subject,
                classID: classId,
            });
          await newStudent.save();
          
        } catch (error) {
            console.error(error);
            res.status(500).send('Eror: '+ error);
        }
        
    }
    // [GET] /
    
}

module.exports = new StudentController;