const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    dateOfBirth: Date
})

const User = mongoose.model('User', UserSchema);
module.exports = User;