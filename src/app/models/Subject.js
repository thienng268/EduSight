const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subject = new Schema({
    StartTime: Date,
    EndTime: Date,
    NameSubject: String,
    DayOfWeek: String,
    gradeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade' },
    teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
}); 

module.exports = mongoose.model('Subject', Subject,'subjects');