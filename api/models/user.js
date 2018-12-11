const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../../config/config');

//User schema
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
});

userSchema.methods = {

    authenticate: function (password) {
        return passwordHash.verify(password, this.password);
    },

    getToken: function () {
        return jwt.encode(this, config.secret);
    }
}

module.exports = mongoose.model('User', userSchema);