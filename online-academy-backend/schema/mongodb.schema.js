const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    role: {
        type: Number,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
})

module.exports = {UserSchema}