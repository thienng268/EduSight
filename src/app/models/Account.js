const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    AccKey: String,
    Username: String,
    Password: String,
    Role: String,
});

module.exports = mongoose.model('Account', Account);