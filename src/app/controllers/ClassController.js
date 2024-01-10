const Teacher = require('../models/Teacher'); 
const Class = require('../models/Class');
const Student = require('../models/Student');
const multer = require('multer');
const xlsx = require('xlsx');
class ClassController
{
    async index(req, res) {
        try {
            // Lấy danh sách tất cả các lớp học và thông tin giáo viên chủ nhiệm
            const classes = await Class.find({})
                .select('Name teacherID'); // Chọn các trường dữ liệu cần hiển thị
            // Duyệt qua mỗi lớp để thêm thông tin giáo viên vào dữ liệu trả về
            const classesWithTeachers = await Promise.all(classes.map(async (classItem) => {
                // Lấy thông tin giáo viên từ bảng Teacher dựa trên teacherID
                const teacher = await Teacher.findById(classItem.teacherID).select('Name');
                // Trả về đối tượng mới có thêm thông tin giáo viên
                return {
                    ...classItem.toObject(),
                    teacherName: teacher ? teacher.Name : 'Unknown Teacher', // Nếu không tìm thấy giáo viên, có thể trả về giá trị mặc định
                };
            }));
            
            console.log("Classes:", classesWithTeachers);
            res.render('class_list', { classes: classesWithTeachers });
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra');
        }
    }
    
    
    async show(req, res) {
        try {
            const classId = req.query.classId; // Lấy ObjectID từ query parameter
            // Giả sử bạn có một model Student và mỗi student có một field là classID
            const students = await Student.find({ classID: classId }).lean();
            res.render('student', { students }); // Truyền danh sách học sinh đến template
        } catch (error) {
            console.error(error);
            res.status(500).send('LỖI');
        }
    }

    async create_class(req, res) {
        try {
            // Tạo mới Class
            const className = req.body.className;
            const headTeacherId = req.body.headTeacher;

            const newClass = new Class({ 
                
                Name: className,
                teacherID: headTeacherId,
              });
            await newClass.save();
            
        
            // Đọc file Excel và thêm Students
            const file = req.file;
            const workbook = xlsx.readFile(file.path);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = xlsx.utils.sheet_to_json(sheet);
        
            const students = data.map(student => {
              return {
                ...student,
                classID: newClass._id
              };
            });
        
            // Thêm Students vào DB
            await Student.insertMany(students);
        
            res.redirect('/class');
          } catch (error) {
            console.error(error);
            res.status(500).send('Error creating class and students');
          }
    }
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
}

module.exports = new ClassController;