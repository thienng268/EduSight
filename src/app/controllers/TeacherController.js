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
            console.log("Teachers:", teachersWithSubjectAndClass);
            res.render('teacher', { teachers: teachersWithSubjectAndClass });
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra');
        }
    }
    
    
    // [GET] /schedule/:slug
    show(req, res) {

    }
}

module.exports = new TeacherController;