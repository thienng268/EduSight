const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema({
    StudentKey: String,
    Address: String,
    ParentName: String,
    ParentPhone: String,
    Status: String,
    Phone: String,
    Name: String,
    ClassKey: String,
});

module.exports = mongoose.model('Student', Student);