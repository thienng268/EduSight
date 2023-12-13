const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subject = new Schema({
    SubjectKey: String,
    StartTime: Date,
    EndTime: Date,
    NameSubject: String,
    DayOfWeek: String,
});

module.exports = mongoose.model('Subject', Subject);