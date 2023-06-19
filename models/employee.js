const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    id: String,
    name: String,
    firstName: String,
    dateCreated: Date,
    department: String,
    checkIn: Date,
    checkInComment: String,
    checkOut:Date,
    checkOutComment: String,
    duration: String
});

module.exports = mongoose.model('Employee', employeeSchema);
