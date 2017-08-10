//dependencies
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: String,
  password: String,
  img: {type: String, default:""},
  firstName: String,
  lastName: String,
  major: {type: String, default:""},
  about: {type: String, default:""},
  course: {type: String, default:""},
  genre: {type: String, default:""}

});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
