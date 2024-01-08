const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema({
    Address: String,
    ParentName: String,
    ParentPhone: String,
    Status: String,
    Phone: String,
    Name: String,
    gradeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade' },
    classID: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
});

module.exports = mongoose.model('Student', Student,'students');