const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Teacher = new Schema({
    
    Address: String,
    Phone: String,
    Role: String,
    Email: String,
    DOB: String,
    Status: String,
    Name: String,
    TeachingClass: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    accountID: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    subjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    HeadingClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    managerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
    avatarID: { type: mongoose.Schema.Types.ObjectId, ref: 'Avatar' },
}, { versionKey: false });

module.exports = mongoose.model('Teacher', Teacher, 'teachers');