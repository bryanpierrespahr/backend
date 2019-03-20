const mongoose = require('mongoose');

//Link schema
const linkSchema = mongoose.Schema({
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

module.exports = mongoose.model('Link', linkSchema);