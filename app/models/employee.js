// Employee model

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  dob: Date,
  address: String,
  phone: String,
  role: { type: String, default: 'employee'}
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
