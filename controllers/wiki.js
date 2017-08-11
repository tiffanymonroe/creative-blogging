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

//Edit Route
router.get('/:id/edit', (req, res)=>{
  Wiki.findById(req.params.id, (err, foundWiki)=>{
    Student.find((err, allStudents)=>{
      Student.findOne({'wiki._id': req.params.id}, (err, foundWikiStudent)=>{
        res.render('wiki/edit.ejs', {
          wiki: foundWiki,
          students: allStudents,
          wikiStudent: foundWikiStudent
        });
      });
    });
  });
});

//Delete Route

router.delete('/:id', (req, res)=>{
  Wiki.findByIdAndRemove(req.params.id, (err, foundWiki)=>{
    Student.findOne({'wiki._id':req.params.id}, (err, foundStudent)=>{
      foundStudent.wiki.id(req.params.id).remove();
      foundStudent.save((err, data)=>{
        res.redirect('/wiki')
      });
    });
  });
});

//Update Route

router.put('/:id', (req, res)=>{
  Wiki.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedWiki)=>{
    Student.findOne({'wiki._id':req.params.id}, (err, foundStudent)=>{
      if(foundStudent._id.toString() !== req.body.studentId){
        foundStudent.wiki.id(req.params.id).remove();
        foundStudent.save((err, saveFoundStudent)=>{
          Student.findById(req.body.studentId, (err, newStudent)=>{
            newStudent.wiki.push(updatedWiki);
            newStudent.save((err, savedNewStudent)=>{
              res.redirect('/wiki/' +req.params.id);
            });
          });
        });
      } else {
          foundStudent.wiki.id(req.params.id).remove();
          foundStudent.wiki.push(updatedWiki);
          foundStudent.save((err, data)=>{
            res.redirect('/wiki/' +req.params.id);
          });
      }
    });
  });
});



module.exports = router;
