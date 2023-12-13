const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Class = new Schema({
    Name: String,
    ClassKey: String,
    ManagerKey: String,
});

module.exports = mongoose.model('Class', Class);