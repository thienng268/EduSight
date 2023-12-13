const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema({
    EventKey: String,
    Name: String,
    DateEvent: Date,
    TimeEvent: Date,
    Venue: String,
    EssentialDetails: String,
});

module.exports = mongoose.model('Event', Event);