const mongoose = require('mongoose');

//Quiz schema
const quizSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    no: Number,
    weekNo: Number,
    title: String,
    type: String,
    questions: [{
        question: String,
        correctAnswer: String,
        incorrectAnswers:[],
        nbCorrect: Number,
        nbIncorrect: Number,
    }],
    timeSpent: Number,

});

module.exports = mongoose.model('Quiz', quizSchema);