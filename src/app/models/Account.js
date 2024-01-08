const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({

    Username: String,
    Password: String,
    Role: String,
    managerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
    teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    adminID: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
});

module.exports = mongoose.model('Account', Account,'accounts');