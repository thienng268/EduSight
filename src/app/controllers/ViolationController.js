const Teacher = require('../models/Teacher'); 
const Class = require('../models/Class');
const Subject = require('../models/Subject');
const Violation = require('../models/Violation');

class ViolationController
{
    async index(req, res) {
        try {
            const violations = await Violation.find({})
                .select('NameStudent Class Violation Date').lean();
            const classes = await Class.find({})
                .select('Name').lean();
            res.render('violation', { violations, classes });
        } catch (error) {
            console.error(error);
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