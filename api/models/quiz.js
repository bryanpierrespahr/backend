const mongoose = require('mongoose');

//Quiz schema
const quizSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    no: Number,
    weekNo: Number,
    title: String,
    type: String,
    questions: [{
        title: String,
        correctAnswer: String,
        incorrectAnswers:[],
    }]

});

module.exports = mongoose.model('Quiz', quizSchema);