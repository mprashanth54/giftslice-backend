const mongoose = require('../db')
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: [3, 'Name is too short']
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        index: true
    },
    mobile: {
        type: String,
        trim: true,
        unique: true,
        index: true
    }
})

userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
}, 'Enter Valid Email')


const users = mongoose.model('Users', userSchema)



module.exports = users