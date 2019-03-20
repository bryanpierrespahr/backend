const mongoose = require('mongoose');

//Lecture schema
const lectureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    weekNo: Number,
    no: Number,
    title: String,
    link: String,
    type: String,
    timeSpent: Number,
    timesOpened: Number,
    uniqueTimesOpened: Number,
});

module.exports = mongoose.model('Lecture', lectureSchema);