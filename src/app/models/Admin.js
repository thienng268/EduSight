const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    
    Name: String,
    DOB: Date,
    Phone: String,
    Address: String,
    accountID: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    avatarID: { type: mongoose.Schema.Types.ObjectId, ref: 'Avatar' },
});

module.exports = mongoose.model('Admin', Admin,'admins');