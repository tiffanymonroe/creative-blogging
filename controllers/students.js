const express = require('express');
const router = express.Router();
const Student = require('../models/students.js');
const bcrypt = require('bcryptjs');

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

//Index Route
router.get('/', (req, res)=>{

  res.render('students/index.ejs')
})



//New Route (Registration)

//Create Route

//Show Route (if logged in)

//Edit Route (logged in, correct id)

//Update Route

//Delete (only wiki posts, blog entries)


module.exports = router;
