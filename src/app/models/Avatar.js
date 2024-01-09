const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Avatar = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String,
    accountRole: String,
    teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    managerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
    adminID: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
});


module.exports = mongoose.model('Avatar', Avatar, 'avatars');
