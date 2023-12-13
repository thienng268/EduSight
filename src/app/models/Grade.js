const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Grade = new Schema({
    HS1: Float,
    HS2: Float,
    HS3: Float,
    Average: Float,
    StudentKey: String,
    SubjectKey: String,
});

module.exports = mongoose.model('Grade', Grade);