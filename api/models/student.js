const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../../config/config');

//Student schema
const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: String,
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    courses: [{
        courseId: String,
        path: String,
        globalScore: Number,
        globalResults: [{
            title: String,
            score: Number,
            quizId: String,
        }],
        quizResults: [{
            quizId: String,
            questions: [],
            answers: [],
            studentAnswers: [],
            correctAnswers: [],
        }],
        timeSpent: Number,
        done: [{
            id: String,
            timeSpent: Number
        }],
        percentage: Number
    }]
});

studentSchema.methods = {

    authenticate: function (password) {
        return passwordHash.verify(password, this.password);
    },

    getToken: function () {
        return jwt.encode(this, config.secret);
    },

}

module.exports = mongoose.model('Student', studentSchema);