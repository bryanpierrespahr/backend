const mongoose = require('mongoose');

//Course schema
const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    code: String,
    scope: String,
    timing: String,
    language: String,
    level: String,
    type: String,
    objective: String,
    teacherId: String,
    schedule :{
        day: String,
        startHour: String,
        endHour: String,
        room: String
    },
    weeksId:[]

});

module.exports = mongoose.model('Course', courseSchema);