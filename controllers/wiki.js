//Dependencies
const express = require('express');
const router = express.Router();
const Wiki = require('../models/wiki.js');
const Student = require('../models/students.js');

//Index Route
router.get('/', (req, res)=>{
  res.render('wiki/index.ejs');
});



module.exports = router;
