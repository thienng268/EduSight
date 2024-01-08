const Teacher = require('../models/Teacher'); 
const Class = require('../models/Class');
const Student = require('../models/Student');
class GradeController
{
    async index(req, res) {
        try {
            const teacherId = "659a905fb7d11e808e17b0b2";
            const teacher = await Teacher.findById(teacherId).populate('TeachingClass');
            const classIds = teacher.TeachingClass.map(tc => tc._id);
            const classes = await Class.find({ '_id': { $in: classIds } }).select('Name');
            console.log("Classes:", classes);
            res.render('grade_list', { classes });
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra');
        }
    }
    
    
    // [GET] /schedule/:slug
    async show(req, res) {
        try {
            const classId = req.query.classId; // Lấy ObjectID từ query parameter
            // Giả sử bạn có một model Student và mỗi student có một field là classID
            const students = await Student.find({ classID: classId }).lean();
            res.render('gradebook', { students }); // Truyền danh sách học sinh đến template
        } catch (error) {
            console.error(error);
            res.status(500).send('LỖI');
        }
    }
}

module.exports = new GradeController;