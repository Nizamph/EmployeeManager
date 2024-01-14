const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  contactNo: { type: Number, required: true },
  salary: { type: Number, required: true },
  age: { type: Number, required: true },
  pic: {
    type: String,
    required: true,
    default:
      'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  },
});
const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;
