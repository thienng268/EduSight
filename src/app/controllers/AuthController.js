const Account = require('../models/Account');
const Class = require('../models/Class');
const Event = require('../models/Event');
const Grade = require('../models/Grade');
const Manager = require('../models/Manager');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class AuthController
{

    async create_account(req, res) {
      
      try {
        // Tạo Account mới
        const Password= req.body.password;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);
      
        const checkUsername = await Account.findOne({Username: req.body.loginname});

        if (checkUsername) {
          // Nếu Username đã tồn tại, thông báo cho người dùng và không lưu Account mới
          return res.send(`<script>
            alert('Tên đăng nhập đã tồn tại');
            window.history.back();
          </script>`);
        }
      
        const newAccount = new Account({
          Username: req.body.loginname,
          Password: hashedPassword,
          Role: req.body.role,
        });
        await newAccount.save();
    
        // Nếu Role là 'Teacher', tạo Teacher mới
        if (req.body.role === 'Teacher') {
          // Thêm logic để xử lý các trường khác của Teacher nếu cần
          const newTeacher = new Teacher({ 
            Name: req.body.username,
            accountID: newAccount._id,
            Status: 'Teaching',
          });
          await newTeacher.save();
          await Account.findByIdAndUpdate(newAccount._id, { $set:
            { teacherID: newTeacher._id,} },{ new: true, useFindAndModify: false }).exec();
          
          req.session.teacherID = newTeacher._id;
          console.log(req.session.teacherID);
        }

        if (req.body.role === 'Management Staff') {
          // Thêm logic để xử lý các trường khác của Teacher nếu cần
          const newManager = new Manager({ 
            Name: req.body.username,
            accountID: newAccount._id,
          });
          await newManager.save();
          await Account.findByIdAndUpdate(newAccount._id, { $set:
            { managerID: newManager._id,} },{ new: true, useFindAndModify: false }).exec();
          
            req.session.managerID = newManager._id;
            console.log(req.session.managerID);
        }

        if (req.body.role === 'Administrator') {
          // Thêm logic để xử lý các trường khác của Teacher nếu cần
          const newAdmin = new Admin({ 
            Name: req.body.username,
            accountID: newAccount._id,
          });
          await newAdmin.save();
          await Account.findByIdAndUpdate(newAccount._id, { $set:
            { adminID: newAdmin._id,} },{ new: true, useFindAndModify: false }).exec();

            req.session.adminID = newAdmin._id;
            console.log(req.session.adminID);
        }
    
        // Gửi lại account mới cho client
        //res.json(newAccount);
        // Hoặc redirect hoặc gửi response phù hợp
        res.redirect('/auth/account');
      } catch (error) {
        // Xử lý lỗi
        res.status(500).send('An error occurred ' + error);
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