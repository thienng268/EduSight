const Teacher = require('../models/Teacher'); 
const Class = require('../models/Class');
const Subject = require('../models/Subject');
const Student = require('../models/Student');
const Grade = require('../models/Grade');

class HomeroomController
{
    async index(req, res) {
        try {
            const teacherIdGoc = req.session.teacherID;
            const teacher = await Teacher.findOne({ _id: teacherIdGoc }).lean();
            if (!teacher) {
                return res.status(404).send('Không tìm thấy giáo viên');
            }
            const classId = teacher.HeadingClass;
            const students = await Student.find({ classID: classId }).lean();
            for (let student of students) {
                student.SubjectAverages = {};
                const grades = await Grade.find({ studentID: student._id }).lean();
                for (let grade of grades) {
                    const subject = await Subject.findById(grade.subjectID).lean();
                    student.SubjectAverages[subject.NameSubject] = grade.Average;
                }
            }
            res.render('homeroom', { students });
        } catch (error) {
            console.error(error);
            res.status(500).send('LỖI');
        }
    }
    async updateBehaviour(req, res) {
        try {
            const behaviours = req.body;
            if (!behaviours || behaviours.length === 0) {
                return res.status(400).json({ success: false, message: 'Không có dữ liệu cập nhật' });
            }
    
            const updatePromises = behaviours.map(data => {
                if (!data.studentId || !data.behaviour) {
                    throw new Error('Thiếu studentId hoặc behaviour');
                }
                return Student.findByIdAndUpdate(
                    data.studentId,
                    { $set: { Behaviour: data.behaviour } },
                    { new: true }
                );
            });
    
            const updatedBehaviour = await Promise.all(updatePromises);
            res.json({ success: true, data: updatedBehaviour });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Lỗi khi cập nhật: ' + error.message });
        }
    }
    
}

module.exports = new HomeroomController;