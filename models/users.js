const mongoose = require('mongoose')
const passLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.plugin(passLocalMongoose)
module.exports = mongoose.model('User', userSchema)