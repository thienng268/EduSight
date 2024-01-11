const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Class = new Schema({
    Name: String,
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    khoiID: { type: mongoose.Schema.Types.ObjectId, ref: 'Khoi' },
    managerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
    eventID: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
});

module.exports = mongoose.model('Class', Class),'classes';