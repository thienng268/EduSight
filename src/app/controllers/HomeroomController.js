const Teacher = require('../models/Teacher'); 
const Class = require('../models/Class');
const Subject = require('../models/Subject');
const Student = require('../models/Student');
const Grade = require('../models/Grade');
const Semester = require('../models/Semester');

class HomeroomController
{    
    async index(req, res) {
        try {
            const teacherIdGoc = req.session.teacherID;
            const teacher = await Teacher.findOne({ _id: teacherIdGoc }).lean();
            if (!teacher) {
                return res.status(404).send('Không tìm thấy giáo viên');
            }
            const semesterNum = req.query.semesterNum;
            const Num = semesterNum === '2' ? 2 : 1;
            const semesters = await Semester.find({ semesterNum: Num }).lean();
            const semesterIds = semesters.map(semester => semester._id);
            const classId = teacher.HeadingClass;
            const students = await Student.find({ classID: classId }).lean();
    
            const studentsWithDTB = await Promise.all(students.map(async (student) => {
                student.SubjectAverages = {};
                let totalAverage = 0;
                let subjectCount = 0; // Biến đếm số môn học có giá trị
    
                const grades = await Grade.find({
                    studentID: student._id,
                    semesterID: { $in: semesterIds }
                }).lean();
    
                for (const grade of grades) {
                    const subject = await Subject.findById(grade.subjectID).lean();
                    const average = grade.Average || null; // Nếu không có giá trị, gán bằng 0
                    student.SubjectAverages[subject.NameSubject] = average;
                    totalAverage += average;
                    if (average != null) {
                        subjectCount++; // Tăng biến đếm nếu có giá trị > 0
                    }
                }
                subjectCount = Math.min(subjectCount, 8);
                student.DTB = subjectCount === 8 ? (totalAverage / subjectCount).toFixed(1) : null;
                await Semester.updateOne(
                    { semesterNum: Num, studentID: student._id },
                    { $set: { DTB: student.DTB } }
                );
                return student;
            }));
    
            res.render('homeroom', { students: studentsWithDTB });
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