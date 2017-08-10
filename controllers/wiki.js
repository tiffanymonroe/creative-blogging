//Dependencies
const express = require('express');
const router = express.Router();
const Wiki = require('../models/wiki.js');
const Student = require('../models/students.js');

//Index Route
router.get('/', (req, res)=>{
  Wiki.find((err, foundWikis)=>{
    res.render('wiki/index.ejs', {
      wikis: foundWikis
    });
  });
});

//New Route
router.get('/new', (req, res)=>{
  Student.find((err, allStudents)=>{
    res.render('wiki/new.ejs', {
      students: allStudents
    });
  });
});



module.exports = router;
