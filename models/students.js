//dependencies
const mongoose = require('mongoose');
const Wiki = require('../models/wiki.js');

const studentSchema = new mongoose.Schema({
  username: String,
  password: String,
  img: {type: String, default:""},
  firstName: String,
  lastName: String,
  major: {type: String, default:""},
  about: {type: String, default:""},
  course: {type: String, default:""},
  genre: {type: String, default:""},
  posts: [Wiki.schema]

});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
