const Account = require('../models/Account');
const Class = require('../models/Class');
const Event = require('../models/Event');
const Grade = require('../models/Grade');
const Manager = require('../models/Manager');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
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
    async account(req, res) {
      try {
        // Lấy danh sách tất cả các lớp học và thông tin giáo viên chủ nhiệm
        const accounts = await Account.find({Role: 'Teacher'})
            .select('Username Role Block teacherID'); // Chọn các trường dữ liệu cần hiển thị
        // Duyệt qua mỗi lớp để thêm thông tin giáo viên vào dữ liệu trả về
        //console.log(accounts);
        const accountsWithTeachers = await Promise.all(accounts.map(async (accountItem) => {
            // Lấy thông tin giáo viên từ bảng Teacher dựa trên teacherID
            const teacher = await Teacher.findById(accountItem.teacherID).select('Name');
            // Trả về đối tượng mới có thêm thông tin giáo viên
            return {
                ...accountItem.toObject(),
                teacherName: teacher ? teacher.Name : 'Unknown Teacher', // Nếu không tìm thấy giáo viên, có thể trả về giá trị mặc định
            };
        }));
        //console.log("Account:", accountsWithTeachers);

        const accountandmanagers = await Account.find({Role: 'Management Staff'})
            .select('Username Role Block managerID'); // Chọn các trường dữ liệu cần hiển thị
        // Duyệt qua mỗi lớp để thêm thông tin giáo viên vào dữ liệu trả về
        //console.log(accountandmanagers);
        const accountsWithManagers = await Promise.all(accountandmanagers.map(async (accountItem) => {
            // Lấy thông tin giáo viên từ bảng Teacher dựa trên teacherID
            const manager = await Manager.findById(accountItem.managerID).select('Name');
            // Trả về đối tượng mới có thêm thông tin giáo viên
            return {
                ...accountItem.toObject(),
                managerName: manager ? manager.Name : 'Unknown Manager', // Nếu không tìm thấy giáo viên, có thể trả về giá trị mặc định
            };
        }));
        //console.log("Account and manager:", accountsWithManagers);


        const accountandadmins = await Account.find({Role: 'Administrator'})
            .select('Username Role Block adminID'); // Chọn các trường dữ liệu cần hiển thị
        // Duyệt qua mỗi lớp để thêm thông tin giáo viên vào dữ liệu trả về
        //console.log(accountandadmins);
        const accountsWithAdmins = await Promise.all(accountandadmins.map(async (accountItem) => {
            // Lấy thông tin giáo viên từ bảng Teacher dựa trên teacherID
            const admin = await Admin.findById(accountItem.adminID).select('Name');
            // Trả về đối tượng mới có thêm thông tin giáo viên
            return {
                ...accountItem.toObject(),
                adminName: admin ? admin.Name : 'Unknown Admin', // Nếu không tìm thấy giáo viên, có thể trả về giá trị mặc định
            };
        }));
        //console.log("Account and admin:", accountsWithAdmins);
        

        res.render('account_list', { accounts: accountsWithTeachers, accountandmanagers: accountsWithManagers, accountandadmins: accountsWithAdmins});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: '+error);
    }
        //res.render('account_list');
    }

    // [GET] /news/:slug
    async disable_account(req, res) {
      try {
        const { accountId } = req.body;
        const account = await Account.findByIdAndUpdate(accountId, { Block: false }, { new: true });
        if (account) {
          res.json({ success: true, message: 'Account disabled successfully.' });
        } else {
          res.status(404).json({ success: false, message: 'Account not found.' });
        }
        
      } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred.', error: error });
      }
    }

    async enable_account(req, res) {
      try {
        const { accountId } = req.body;
        const account = await Account.findByIdAndUpdate(accountId, { Block: true }, { new: true });
        if (account) {
          res.json({ success: true, message: 'Account disabled successfully.' });
        } else {
          res.status(404).json({ success: false, message: 'Account not found.' });
        }
        
      } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred.', error: error });
      }
    }

    async signin(req, res) {
      const { Username, Password } = req.body;

      try {
      // Tìm tài khoản dựa trên email
      const account = await Account.findOne({Username: Username, Block: true}).exec();
      const disabledaccount = await Account.findOne({Username: Username}).exec();

      if (req.body.rememberMe) {
          const rememberToken = crypto.randomBytes(20).toString('hex');
          // Lưu token vào cơ sở dữ liệu và thiết lập cookie
          res.cookie('remember_me', rememberToken, { maxAge: 2592000000, httpOnly: true }); // 30 ngày
      }

      if(disabledaccount && disabledaccount.Block === false) {
        return res.status(401).send('Account is disable');
      }

      if (!account) {
          return res.status(401).send('Account does not exist.');
      }

      if (account) {
          // Lưu thông tin người dùng vào session hoặc một object toàn cục
          req.session.user = {
          ...account.toObject(),
          isTeacher: account.Role === 'Teacher',
          isManager: account.Role === 'Management Staff',
          isAdmin: account.Role === 'Administrator',
        };

            // Loại bỏ mật khẩu khỏi session
          // Tiếp tục với việc chuyển hướng hoặc xử lý khác
        }
        

      /* if (Email != account) {
          return res.status(401).send('Email không tồn tại trong data');
      } */

      // So sánh mật khẩu nhập vào với mật khẩu đã băm trong database
      const passwordMatch = await bcrypt.compare(Password, account.Password);

      if (!passwordMatch) {
         return res.status(401).send('Incorrect password.');
      }

      /* if(Password != account.Password) {
          return res.status(401).send(' Mật khẩu không chính xác. ');
      } */


      // Kiểm tra vai trò của tài khoản và tạo token nếu cần
      if (account.Role === 'Administrator') {
          // Đảm bảo JWT_SECRET được cấu hình và có giá trị
          const JWT_SECRET_admin = process.env.JWT_SECRET_admin || 'your_default_secret';
          
          // Tạo JWT để xác thực phiên làm việc của admin
          const token_admin = jwt.sign(
              { id: account._id, role: account.Role },
              JWT_SECRET_admin,
              { expiresIn: '1h' }
          );
          
          // Lưu trữ token trong cookie hoặc gửi trực tiếp trong phản hồi
          res.cookie('token', token_admin, { httpOnly: true });
          req.session.adminID = account.adminID;
          console.log(req.session.adminID);
          // Chuyển hướng người dùng đến trang quản trị
          return res.redirect('/dashboard');
      } else {
          if (account.Role === 'Teacher') {
              // Đảm bảo JWT_SECRET được cấu hình và có giá trị
              const JWT_SECRET_teacher = process.env.JWT_SECRET_teacher || 'your_default_secret';
              
              // Tạo JWT để xác thực phiên làm việc của admin
              const token_teacher = jwt.sign(
                  { id: account._id, role: account.Role },
                  JWT_SECRET_teacher,
                  { expiresIn: '1h' }
              );
              
              // Lưu trữ token trong cookie hoặc gửi trực tiếp trong phản hồi
              res.cookie('token', token_teacher, { httpOnly: true });
              req.session.teacherID = account.teacherID;
              console.log(req.session.teacherID);
              // Chuyển hướng người dùng đến trang quản trị
              return res.redirect('/dashboard');
          } else {
              if (account.Role === 'Management Staff') {
                  // Đảm bảo JWT_SECRET được cấu hình và có giá trị
                  const JWT_SECRET_manager = process.env.JWT_SECRET_manager || 'your_default_secret';
                  
                  // Tạo JWT để xác thực phiên làm việc của admin
                  const token_manager = jwt.sign(
                      { id: account._id, role: account.Role },
                      JWT_SECRET_manager,
                      { expiresIn: '1h' }
                  );
                  
                  // Lưu trữ token trong cookie hoặc gửi trực tiếp trong phản hồi
                  res.cookie('token', token_manager, { httpOnly: true });
                  req.session.managerID = account.managerID;
                  console.log(req.session.managerID);
                  // Chuyển hướng người dùng đến trang quản trị
                  return res.redirect('/dashboard');
              } else {
                  return res.status(403).send('Not have access.');
              }
          }
      };
      
      } catch (error) {
      console.error(error);
      res.status(500).send('Error: '+ error); 
      }
    }
    
}

module.exports = new AuthController;