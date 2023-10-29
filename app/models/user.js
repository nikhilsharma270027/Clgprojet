// For user data

const mongoose = require('mongoose');
const Schema = mongoose.Schema  //Schema is a class

const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, default: 'customer'}
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);