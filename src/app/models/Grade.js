const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Grade = new Schema({
    HS11: Number,
    HS12: Number,
    HS13: Number,
    HS14: Number,
    HS21: Number,
    HS22: Number,
    HS3: Number,
    Average: Number,
    subjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
});

module.exports = mongoose.model('Grade', Grade,'grades');