const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema({
    Name: String,
    Date: String,
    Venue: String,
    Month: String,
    Description: String,
    // managerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
    // classID: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
});

module.exports = mongoose.model('Event', Event, 'events');