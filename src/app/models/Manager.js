const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Manager = new Schema({
    ManagerKey: String,
    Name: String,
    Status: String,
    Phone: String,
    Address: String,
    EventKey: String,
    AccKey: String,
});

module.exports = mongoose.model('Manager', Manager);