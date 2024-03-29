const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Manager = new Schema({
    
    Name: String,
    Status: String,
    Phone: String,
    DOB: Date,
    Address: String,
    accountID: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    classID: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    eventID: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    avatarID: { type: mongoose.Schema.Types.ObjectId, ref: 'Avatar' },
});

module.exports = mongoose.model('Manager', Manager,'managers');