const Teacher = require('../models/Teacher'); 
const Class = require('../models/Class');
const Subject = require('../models/Subject');
const Event = require('../models/Event');

class EventController
{
    async index(req, res) {
        try {
            const events = await Event.find({})
                .select('Name , Date , Venue , Description , Month').lean();
            res.render('event', { events });
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra');
        }
    }
    
    // async addEvent(req, res) {
    //     try {
    //         const { nameStudent, className, violation, date } = req.body;
    //         const newViolation = new Violation({
    //             NameStudent: nameStudent,
    //             Class: className,
    //             Violation: violation,
    //             Date: date,
    //         });
    //         const savedViolation = await newViolation.save();
    //         res.json(savedViolation);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Có lỗi xảy ra khi thêm vio' });
    //     }
    // }
    // [GET] /schedule/:slug
    show(req, res) {

    }
}

module.exports = new EventController;