const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        default: 'User'
    },
    role: {
        type: String,
        default: 'User'
    },
    isActiveSubscription: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: String
    }
})

module.exports = mongoose.model('users', UserSchema)