//dependencies
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: String,
  password: String,
  img: String,
  firstName: String,
  lastName: String,
  major: String,
  about: String,
  course: String,
  genre: String

});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
