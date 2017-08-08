//Dependencies
const express = require('express');
const Student = require ('../models/students.js');
const router = express.Router();

//Index Route

router.get('/', (req, res)=>{
  Student.find({}, (err, foundStudents)=>{
    res.render('students/index.ejs', {
      students: foundStudents
    });
  });
});

//New Route
router.get('/new', (req, res)=>{
  res.render('students/new.ejs');
});

//Create Route
router.post('/', (req, res)=>{
  Student.create(req.body, (err, createdStudent)=>{
    res.redirect('/students');
  });
});

//Show Route
router.get('/:id', (req, res)=>{
  Student.findById(req.params.id, (err, foundStudent)=>{
    console.log("================================");
    console.log(req.body);
    res.render('students/show.ejs', {
      student: foundStudent
    });
  });
});

//Edit Route
router.get('/:id/edit', (req, res)=>{
  Student.findById(req.params.id, (err, foundStudent)=>{
    res.render('students/edit.ejs', {
      student: foundStudent
    });
  });
});

//Update Route
router.post('/:id', (req, res)=>{
  Student.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, student)=>{
    if(err){console.log(err);} //thanks Karolin! great idea!
    res.redirect('/students' + student.id)
  });
});

//Delete Route
//Students can't delete their account, only posts.


const newStudent = [
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHGstztOpN826VsBqCoI07Bb3F8TOEHLpmIOy8acEwuggVepeV",
    firstName: "Jane",
    lastName: "Austen",
    year: "Freshman",
    major: "English",
    about: "I love to write.",
    course: "I have no other talents.",
    genre: "Fiction"
  },
  {
    img: "https://cdn2.hubspot.net/hub/237126/file-1829785647-jpg/oscar-wilde.jpg",
    firstName: "Oscar",
    lastName: "Wilde",
    year: "Junior",
    major: "Classics",
    about: "There is only one thing in the world worse than being talked about, and that is not being talked about.",
    course: "All art is quite useless.",
    genre: "Drama"
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Black-white_photograph_of_Emily_Dickinson2.png/1200px-Black-white_photograph_of_Emily_Dickinson2.png",
    firstName: "Emily",
    lastName: "Dickinson",
    year: "Junior",
    major: "Religion",
    about: "I love to write.",
    course: "If I can stop one heart from breaking, I shall not live in vain.",
    genre: "Poetry"
  }

]
module.exports = router;
