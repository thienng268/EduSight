const Teacher = require('../models/Teacher'); 
const Class = require('../models/Class');
const Subject = require('../models/Subject');

class TeacherController
{
    async index(req, res) {
        try {
            const teachers = await Teacher.find({})
                .select('Name DOB Status Email Phone Address subjectID HeadingClass');
            const teachersWithSubjectAndClass = await Promise.all(teachers.map(async (teacherItem) => {
                const subject = await Subject.findById(teacherItem.subjectID).select('NameSubject');
                const teacherWithClass = await Teacher.populate(teacherItem, { path: 'HeadingClass', select: 'Name' });
                return {
                    ...teacherWithClass.toObject(),
                    subjectName: subject ? subject.NameSubject : 'Unknown Subject',
                };
            }));
            const subjects = await Subject.find({}, 'NameSubject');
            const allClasses = await Class.find({}); // Lấy tất cả các lớp
            // Lọc chỉ những lớp không có teacherID
            const classesWithoutTeacher = allClasses.filter(classItem => !classItem.teacherID);
            console.log("Teachers:", teachersWithSubjectAndClass);
            res.render('teacher', { teachers: teachersWithSubjectAndClass, subjects, classes: classesWithoutTeacher });
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra');
        }
    }
    
    async addTeacher(req, res) {
        try {
            const { Name, Date, Homeroom, Subject, Email, PhoneNumber, Address } = req.body;
            // Tạo một giáo viên mới
            const newTeacher = new Teacher({
                Name: Name,
                DOB: Date,
                HeadingClass: Homeroom,
                subjectID: Subject,
                Email: Email,
                Phone: PhoneNumber,
                Address: Address,
                Role: "Teacher",
                Status: "Teaching",
            });
            const savedTeacher = await newTeacher.save();
            const updatedClass = await Class.findByIdAndUpdate(
                Homeroom,
                { $set: { teacherID: savedTeacher._id } },
                { new: true }
            );
            res.json(savedTeacher);
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra khi thêm giáo viên');
        }
    }
    // [GET] /schedule/:slug
    show(req, res) {

    }
}

module.exports = new TeacherController;