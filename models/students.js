//dependencies
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  image: String
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
