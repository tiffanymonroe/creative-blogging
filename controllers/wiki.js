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
  console.log("new route has been accessed");
  Student.find((err, allStudents)=>{
    res.render('wiki/new.ejs', {
      students: allStudents
    });
  });
});

//Create Route
router.post('/', (req, res)=>{
  console.log("create route has been accessed");
  Student.findById(req.body.studentId, (err, foundStudent)=>{
      console.log(err);
    Wiki.create(req.body, (err, createdWiki)=>{
        console.log(err);
      foundStudent.wiki.push(createdWiki);
      foundStudent.save((err, data)=>{
        res.redirect('/wiki');
      });
    });
  });
});

//Show Route
router.get('/:id', (req, res)=>{
  console.log("-----------------");
  console.log("show route has been accessed");
  Wiki.findById(req.params.id, (err, foundWiki)=>{
    Student.findOne({'wiki._id':req.params.id}, (err, foundStudent)=>{
      res.render('wiki/show.ejs', {
        student: foundStudent,
        wiki: foundWiki
      });
    });
  });
});




module.exports = router;
