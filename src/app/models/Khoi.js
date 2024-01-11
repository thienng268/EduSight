const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Khoi = new Schema({
    Name: String,
    //teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
});

module.exports = mongoose.model('Khoi', Khoi),'khois';