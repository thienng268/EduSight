const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    
    Name: String,

    Phone: String,
    Address: String,
    accountID: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    
});

module.exports = mongoose.model('Admin', Admin,'admins');