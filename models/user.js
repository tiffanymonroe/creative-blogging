const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  img: String,
  firstName: String,
  lastName: String,
  year: String,
  major: String,
  about: String,
  course: String,
  genre: String

});


module.exports = mongoose.model('userSchema', userSchema);
