const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Grade = new Schema({
    HS1: Number,
    HS2: Number,
    HS3: Number,
    Average: Number,
    subjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
});

module.exports = mongoose.model('Grade', Grade,'grades');