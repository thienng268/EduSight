const mongoose = require('mongoose');

async function connect() 
{
    try {
        await mongoose.connect('mongodb+srv://edusight:edusight@cluster0.k5xashx.mongodb.net/');
        console.log('Connect successfully!');
    } catch (error) {
        console.log('Connect failure!');
    }
}

module.exports = { connect };