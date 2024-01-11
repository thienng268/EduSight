const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Semester = new Schema({
    DTB: Number,
    XepLoai: String,
    semesterNum: Number,
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
});

module.exports = mongoose.model('Semester', Semester, 'semesters');