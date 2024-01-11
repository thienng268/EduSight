const Account = require('../models/Account');
const Admin = require('../models/Admin');
const Class = require('../models/Class');
const Event = require('../models/Event');
const Grade = require('../models/Grade');
const Manager = require('../models/Manager');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');
const Avatar = require('../models/Avatar');

class SiteController
{

    async find(req, res) {
        
        try {
            const role = 'Teaching';
            //const account = await Teacher.find({Status: role});

            const newAccount = await Account.create({Username: 'Liêm', Password: 'liem', Role: 'Teacher'});
            const checkteachers = await Class.find().select('Name').exec();
            const teacher_name = await Teacher.find({_id: '659bca493280c8a9ecfeef46'}).select('Name').lean();
            teacher_name.Name;
            const ex = '6A1';

                // Kiểm tra xem `ex` có tồn tại trong mảng `checkteachers` hay không
                const exists = checkteachers.some(teacher => teacher.Name === ex);

                // Chuẩn bị phản hồi JSON
                const response = {
                    exists: exists,
                    message: exists ? `${ex} được tìm thấy trong checkteachers` : `${ex} không được tìm thấy trong checkteachers`
                };

                //console.log(response);
                res.json(teacher_name);

            //const role = 'jobseeker4@gmail.com';

            //const checkEmail = await Account.findOne({Email: role});
            //res.json(checkteachers);
        } catch (err) {
            console.error(err); // Ghi log lỗi
            res.status(400).json({error: 'ERROR!!!'});
        }
        
    }
    // [GET] /
    signin(req, res) {

        res.render('login', { layout: 'non_sb' });
    }

    async dashboard(req, res) {
        
            try {
                const id = req.session.adminID;
                const admin = await Admin.findOne({_id: id}).lean();
        

                //console.log("Account and admin:", accountsWithAdmins);
              
                
                console.log('Admin: ' + admin);
                
                res.render ('dashboard', admin);
            } catch (error) {
                console.error(error);
                res.status(500).send('Server error' + error);
            }
        
        
    }

    async dashboard(req, res) {
        
        try {
            const id = req.session.adminID;
            const admin = await Admin.findOne({_id: id}).lean();
    

            //console.log("Account and admin:", accountsWithAdmins);
          
            
            console.log('Admin: ' + admin);
            
            res.render ('dashboard', admin);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error' + error);
        }
    
    }

    async dashboard_teacher(req, res) {
        
        try {
            const id = req.session.teacherID;
            const teacher = await Teacher.findOne({_id: id}).lean();
    

            //console.log("Account and admin:", accountsWithAdmins);
          
            
            console.log('Admin: ' + teacher);
            
            res.render ('dashboard_teacher', teacher);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error' + error);
        }
    
    }

    async dashboard_teacher(req, res) {
        
        try {
            const id = req.session.teacherID;
            const teacher = await Teacher.findOne({_id: id}).lean();
    

            //console.log("Account and admin:", accountsWithAdmins);
          
            
            console.log('Admin: ' + teacher);
            
            res.render ('dashboard_teacher', teacher);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error' + error);
        }
    
    }

    async dashboard_manager(req, res) {
        
        try {
            const id = req.session.managerID;
            const teacher = await Manager.findOne({_id: id}).lean();
    

            //console.log("Account and admin:", accountsWithAdmins);
          
            
            console.log('Admin: ' + teacher);
            
            res.render ('dashboard_manager', teacher);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error' + error);
        }
    
    }

    // [GET] /news/:slug
    search(req, res) {
        res.render('search');
    }
    theliem(req, res) {
        res.render('gradebook'); 
        //res.render('profile', { layout: 'non_sb' });
    }
}

module.exports = new SiteController;