//dependencies
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  image: String
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
