const mongoose = require('mongoose');

//Teacher schema
const teacherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
});

module.exports = mongoose.model('Teacher', teacherSchema);