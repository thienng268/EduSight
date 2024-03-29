const Teacher = require('../models/Teacher'); 
const Class = require('../models/Class');
const Student = require('../models/Student');
const Grade = require('../models/Grade');
const Semester = require('../models/Semester');
const mongoose = require('mongoose');
class GradeController
{
    async index(req, res) {
        try {
            const teacherIdGoc = req.session.teacherID;
            const teacherGoc = await Teacher.findById(teacherIdGoc).populate('TeachingClass');
            const classIds = teacherGoc.TeachingClass.map(tc => tc._id);
            const classes = await Class.find({ '_id': { $in: classIds } })
                .populate({
                    path: 'teacherID',
                    select: 'Name',
                })
                .select('Name teacherID');
            const classesWithTeacherName = await Promise.all(classes.map(async (classItem) => {
                const teacher = await Teacher.findById(classItem.teacherID).select('Name');
                return {
                    ...classItem.toObject(),
                    teacherName: teacher ? teacher.Name : 'Unknown Teacher',
                };
            }));
            console.log("Classes:", classesWithTeacherName);
            res.render('grade_list', { classes: classesWithTeacherName });
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra');
        }
    }
    
    
    // [GET] /schedule/:slug
    async show(req, res) {
        try {
            const classId = req.query.classId;
            const students = await Student.find({ classID: classId }).lean();
            const teacherIdGoc = req.session.teacherID;
            const teacherInfo = await Teacher.findOne({ _id: teacherIdGoc }).lean();
            const subjectIDGV = teacherInfo.subjectID;
            const semesterNum = req.query.semesterNum;
            const Num = semesterNum === '2' ? 2 : 1; 
            const semesters = await Semester.find({ semesterNum: Num }).lean();
            const semesterIds = semesters.map(semester => semester._id);
            const studentIDs = students.map(student => student._id);
            const gradesList = await Grade.find({
                subjectID: subjectIDGV,
                studentID: { $in: studentIDs.map(id => id) },
                semesterID: { $in: semesterIds },
            }).lean();
            const combinedData = students.map(student => {
                const gradeInfo = gradesList.find(grade => grade.studentID.equals(student._id));
                return {
                    _id: student._id,
                    Name: student.Name,
                    GradeID: gradeInfo._id,
                    HS11: gradeInfo ? gradeInfo.HS11 : null,
                    HS12: gradeInfo ? gradeInfo.HS12 : null,
                    HS13: gradeInfo ? gradeInfo.HS13 : null,
                    HS14: gradeInfo ? gradeInfo.HS14 : null,
                    HS21: gradeInfo ? gradeInfo.HS21 : null,
                    HS22: gradeInfo ? gradeInfo.HS22 : null,
                    HS3: gradeInfo ? gradeInfo.HS3 : null,
                    Average: gradeInfo ? gradeInfo.Average : null,
                };
            });
            res.render('gradebook', { combinedData }); 
        } catch (error) {
            console.error(error);
            res.status(500).send('LỖI');
        }
    }
    
    async updateGrades(req, res) {
        try {
            const updatedData = req.body;
            const updatePromises = updatedData.map(data => {
                const hs11 = Number(data.hs11);
                const hs12 = Number(data.hs12);
                const hs13 = Number(data.hs13);
                const hs14 = Number(data.hs14);
                const hs21 = Number(data.hs21);
                const hs22 = Number(data.hs22);
                const hs3 = Number(data.hs3);
                const hasNullValue = [data.hs11, data.hs12, data.hs13, data.hs14, data.hs21, data.hs22, data.hs3].some(value => value === null);
                const average = hasNullValue ? null : ((hs11 + hs12 + hs13 + hs14 + hs21 * 2 + hs22 * 2 + hs3 * 3) / 11).toFixed(1);
                return Grade.findByIdAndUpdate(
                    data.gradeId,
                    {
                        $set: {
                            HS11: data.hs11,
                            HS12: data.hs12,
                            HS13: data.hs13,
                            HS14: data.hs14,
                            HS21: data.hs21,
                            HS22: data.hs22,
                            HS3: data.hs3,
                            Average: average,
                        }
                    },
                    { new: true }
                );
            });

            const updatedGrades = await Promise.all(updatePromises);
            res.json(updatedGrades);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating data.' });
        }
    }
}

module.exports = new GradeController;