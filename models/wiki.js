//Dependencies
const mongoose = require('mongoose');

const wikiSchema = new mongoose.Schema({
  title: String,
  article: String
})

const Wiki = mongoose.model('Wiki', wikiSchema);

module.exports = Wiki;
