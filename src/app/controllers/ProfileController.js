const Account = require('../models/Account');
const Class = require('../models/Class');
const Event = require('../models/Event');
const Grade = require('../models/Grade');
const Manager = require('../models/Manager');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');
const Avatar = require('../models/Avatar');

const multer = require('multer');
// Sử dụng memoryStorage để tệp được lưu trong bộ nhớ tạm thời
const upload = multer({ storage: multer.memoryStorage() });


class ProfileController
{
   async index(req, res) {
        try {
            const subjects = await Subject.find().select('NameSubject').lean(); // 'NameSubject' là tên field bạn muốn lấy
            console.log(subjects);
            res.render('profile', { subjects: subjects, layout: 'non_sb' }); // 'profile' là tên file hbs của bạn
          } catch (error) {
            console.error(error);
            res.status(500).send('Server error' + error);
          }
          
    }

    async profile_other(req, res) {
        res.render('profile_other', { layout: 'non_sb' });
    }

    async loading_profile_other(req, res) {
        if(req.session.Role == 'Management Staff'){
            try {
                const id = req.session.managerID;
            
            const newAvatar = new Avatar({ 
                
                name: req.file.originalname,
                data: req.file.buffer,
                contentType: req.file.mimetype,
                accountRole: req.session.Role,
                managerID: id,
              });
            await newAvatar.save();

            const manager = await Manager.findByIdAndUpdate(id, {
                Phone: req.body.Phonenumber,
                DOB: req.body.date,
                Address: req.body.Address,
                avatarID: newAvatar._id,
            }).exec();
            
            return res.redirect('/');
            } catch (error) {
                console.error(error);
                res.status(500).send('Server error' + error);
            }
            
        }else{
            if(req.session.Role == 'Administrator'){
                try {
                    const id = req.session.adminID;
            
                const newAvatar = new Avatar({ 
                
                name: req.file.originalname,
                data: req.file.buffer,
                contentType: req.file.mimetype,
                accountRole: req.session.Role,
                adminID: id,
              });
                await newAvatar.save();

                const adminID = await Admin.findByIdAndUpdate(id, {
                    Phone: req.body.Phonenumber,
                    DOB: req.body.date,
                    Address: req.body.Address,
                    avatarID: newAvatar._id,
                }).exec();
                
                return res.redirect('/');
            
                } catch (error) {
                    console.error(error);
                res.status(500).send('Server error' + error);
                }
            }

        }

    }

    async loading_profile(req, res) {
        try {
            
        const id = req.session.teacherID;
        
        const newAvatar = new Avatar({ 
            
            name: req.file.originalname,
            data: req.file.buffer,
            contentType: req.file.mimetype,
            accountRole: req.session.Role,
            managerID: id,
          });
        await newAvatar.save();

        const teacher = await Teacher.findByIdAndUpdate(id, {
            Phone: req.body.Phonenumber,
            DOB: req.body.date,
            Address: req.body.Address,
            subjectID: req.body.subject,
            Email:req.session.email,
            avatarID: newAvatar._id,
            Role: 'Subject',
        }).exec();
        
        return res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error' + error);
        }
    }

}

module.exports = new ProfileController;