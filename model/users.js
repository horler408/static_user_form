const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true}
})

exports.module = mongoose.model('User', userSchema)