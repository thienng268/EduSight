const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Teacher = new Schema({
    TeacherKey: String,
    Address: String,
    Phone: String,
    Role: String,
    HeadingClass: String,
    TeachingClass: String,
    Status: String,
    Name: String,
    AccKey: String,
    SubjectKey: String,
    ManagerKey: String,
});

module.exports = mongoose.model('Teacher', Teacher);