const Teacher = require('../models/Teacher'); 
const Class = require('../models/Class');
const Subject = require('../models/Subject');
const Event = require('../models/Event');

class EventController
{
    async index(req, res) {
        try {
            const events = await Event.find({ Avail: '1' })
                .select('Name , Date , Venue , Description , Month , _id , Avail')
                .lean();
            res.render('event', { events });
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra');
        }
    }
    
    async deleteEvent(req, res) {
        try {
            const { _id } = req.body;
            const updatedEvent = await Event.findByIdAndUpdate(_id, { Avail: '0' }, { new: true });
            res.status(200).json(updatedEvent);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Có lỗi xảy ra khi cập nhật sự kiện.' });
        }
    }
    // [GET] /schedule/:slug
    show(req, res) {

    }
}

module.exports = new EventController;