//Dependencies
const express = require('express');
const router = express.Router();
const Student = require('../models/students.js');
const Wiki = require('../models/wiki.js');
const bcrypt = require('bcryptjs');


//Index Route
router.get('/', (req, res)=>{
  console.log('index route accessed');
  Student.find((err, foundStudents)=>{
    res.render('students/index.ejs', {
      students: foundStudents
    });
  });
});

//Login Route
router.get('/login', (req, res)=>{
  res.render('students/login.ejs', {
    message: req.session.message || ""
  });
});

router.post('/login', (req, res)=>{
  Student.findOne({username: req.body.username}, (err, student)=>{
    if(student){
      //compare hash with password
      if(bcrypt.compareSync(req.body.password, student.password)){
        req.session.message = "";
        req.session.username = req.body.username;
        req.session.logged = true;
        res.redirect('/students');
      } else {
        console.log("else in bcrypt compare");
        req.session.message = "Sadness! The username or password are incorrect."
        res.redirect('/students/login')
      }
    } else req.session.message = "Sadness! The username or password are incorrect."
    res.redirect('/students/login')
  });
});




//New Route (Registration)

router.get('/register', (req, res)=>{
  res.render('students/register.ejs', {})
});

//Create Route

router.post('/register', (req, res)=>{
  //hash password
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  //creat db entry
  const userDbEntry = {};
  userDbEntry.firstName = req.body.firstName;
  userDbEntry.lastName = req.body.lastName;
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;

  //put password into db
  Student.create(userDbEntry, (err, student)=>{
    console.log(student + " has been added to the database.");

    //session
    req.session.username = student.username;
    req.session.logged = true;
    res.redirect('/students')
  });
});


//Show Route (if logged in)
router.get('/:id', (req, res)=>{
  Student.findById(req.params.id, (err, foundStudent)=>{
    console.log("The show route has been accessed.");
    // if (err) throw err
  //   if (req.session.logged === true){
    console.log(foundStudent);
    if (err) console.log(err);
    res.render('students/show.ejs', {
      student: foundStudent
    });
  // } else {
  //     res.redirect('/students/login')
  // }
  });
});


//Edit Route (logged in, correct id)
router.get('/:id/edit', (req, res)=>{
  console.log('edit route accessed');
  Student.findById(req.params.id, (err, foundStudent)=>{
    console.log('foundStudent in edit route: ', foundStudent);
    res.render('students/edit.ejs', {
      student: foundStudent
    });
  });
});

//Update Route
router.put('/:id', (req, res)=>{
  Student.findByIdAndUpdate(req.params.id, req.body, (err, student)=>{
    res.redirect('/students/' + student.id);
  });
});



//Delete
router.delete('/:id', (req, res)=>{
  console.log("delete route has been accessed");
  Student.findByIdAndRemove(req.params.id, (err, foundStudent)=>{
          res.redirect('/students');
  });
});


module.exports = router;
