const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Teacher = new Schema({
    
    Address: String,
    Phone: String,
    Role: String,
    HeadingClass: String,
    TeachingClass: String,
    Status: String,
    Name: String,
    accountID: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    subjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    classID: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    managerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
});

module.exports = mongoose.model('Teacher', Teacher, 'teachers');