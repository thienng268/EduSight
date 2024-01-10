const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Violation = new Schema({
    NameStudent: String,
    Class: String,
    Violation: String,
    Date: String,
}, { versionKey: false });

module.exports = mongoose.model('Violation', Violation, 'violations');