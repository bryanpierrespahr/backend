const mongoose = require('mongoose');

//Week schema
const weekSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    no: Number,
    lecturesId: [],
    linksId:[],
    quizzesId: []
});

module.exports = mongoose.model('Week', weekSchema);