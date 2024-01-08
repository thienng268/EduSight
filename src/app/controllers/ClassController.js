const Teacher = require('../models/Teacher'); 
const Class = require('../models/Class');
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
    
    
    // [GET] /schedule/:slug
    show(req, res) {

    }
}

module.exports = new ClassController;