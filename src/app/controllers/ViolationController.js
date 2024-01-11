const Teacher = require('../models/Teacher'); 
const Class = require('../models/Class');
const Subject = require('../models/Subject');
const Violation = require('../models/Violation');
const Student = require('../models/Student');
const Semester = require('../models/Semester');
const Khoi = require('../models/Khoi');

async function getStudentInfoAllClasses(Num) {
    try {
        // Lấy tất cả các lớp
        const classes = await Class.find({}).select('_id Name khoiID').lean();
        const allStudents = [];

        // Duyệt qua từng lớp
        for (const classObj of classes) {
            const classId = classObj._id;
            const className = classObj.Name;
            const students = await Student.find({ classID: classId }).select('_id Name DOB').lean();

            // Duyệt qua từng học sinh trong lớp
            const studentsWithDTB = await Promise.all(students.map(async (student) => {
                const studentId = student._id;
                const studentName = student.Name;
                const studentDOB = student.DOB;
                const dtb = await getDTBFromSemester(studentId, Num);
                return {
                    Name: studentName,
                    DOB: studentDOB,
                    DTB: dtb,
                    ClassName: className
                };
            }));

            // Thêm danh sách học sinh của lớp vào mảng chung
            allStudents.push(...studentsWithDTB);
        }

        // Sắp xếp và lấy top 5 học sinh
        allStudents.sort((a, b) => (b.DTB || 0) - (a.DTB || 0));
        const top5Students = allStudents.slice(0, 5);

        return top5Students;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


async function getStudentInfoKhoi(khoiId, Num) {
    try {
        const classes = await Class.find({ khoiID: khoiId }).select('_id Name').lean();
        const allStudents = [];
        for (const classObj of classes) {
            const classId = classObj._id;
            const className = classObj.Name;
            const students = await Student.find({ classID: classId }).select('_id Name DOB').lean();
            const studentsWithDTB = await Promise.all(students.map(async (student) => {
                const studentId = student._id;
                const studentName = student.Name;
                const studentDOB = student.DOB;
                const dtb = await getDTBFromSemester(studentId, Num);
                return {
                    Name: studentName,
                    DOB: studentDOB,
                    DTB: dtb,
                    ClassName: className
                };
            }));
            allStudents.push(...studentsWithDTB);
        }

        // Sắp xếp và lấy top 5 học sinh
        allStudents.sort((a, b) => (b.DTB || 0) - (a.DTB || 0));
        const top5Students = allStudents.slice(0, 5);

        return top5Students;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


async function getStudentInfo(classId, Num) {
    try {
        const classInfo = await Class.findOne({ _id: classId }).select('Name').lean();
        if (!classInfo) {
            console.error("Không tìm thấy lớp với _id là", classId);
            return [];
        }
        const className = classInfo.Name;
        const students = await Student.find({ classID: classId }).select('_id Name DOB').lean();
        const studentsWithDTB = await Promise.all(students.map(async (student) => {
            const studentId = student._id;
            const studentName = student.Name;
            const studentDOB = student.DOB;
            const dtb = await getDTBFromSemester(studentId, Num);
            return {
                Name: studentName,
                DOB: studentDOB,
                DTB: dtb,
                ClassName: className
            };
        }));
        studentsWithDTB.sort((a, b) => (b.DTB || 0) - (a.DTB || 0));
        const top5Students = studentsWithDTB.slice(0, 5);
        return top5Students;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
async function getDTBFromSemester(studentId, semesterNum) {
    const semester = await Semester.findOne({
        studentID: studentId,
        semesterNum: semesterNum
    }).select('DTB').lean();

    return semester ? semester.DTB : 0;
}

class ViolationController
{
    async index(req, res) {
        try {
            const violations = await Violation.find({})
                .select('NameStudent Class Violation Date').lean();
            const classes = await Class.find({})
                .select('Name _id').lean();
            const khois = await Khoi.find({})
                .select('Name _id').lean();
            const classId = req.query.classID;
            const khoiId = req.query.khoiID;
            const semesterNum = req.query.semesterNum;
            const Num = semesterNum === '2' ? 2 : 1;
            const studentData = await getStudentInfo(classId, Num);
            const studentDataKhoi = await getStudentInfoKhoi(khoiId, Num);
            const studentDataTruong = await getStudentInfoAllClasses(Num);
            res.render('violation', { students: studentData , violations, classes, studentsKhoi: studentDataKhoi, khois, studentAll: studentDataTruong });
        } catch (error) {
            console.error("Lỗi trong phương thức index:", error);
            res.status(500).send('Có lỗi xảy ra');
        }
    }
    
    async addVio(req, res) {
        try {
            const { nameStudent, className, violation, date } = req.body;
            const newViolation = new Violation({
                NameStudent: nameStudent,
                Class: className,
                Violation: violation,
                Date: date,
            });
            const savedViolation = await newViolation.save();
            res.json(savedViolation);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Có lỗi xảy ra khi thêm vio' });
        }
    }
    // [GET] /schedule/:slug
    show(req, res) {

    }
}

module.exports = new ViolationController;