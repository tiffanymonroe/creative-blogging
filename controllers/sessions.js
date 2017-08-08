const express = require('express');
const router = express.Router();
const Student = require('../models/students.js');
const bcrypt = require('bcryptjs');

//Login Route
router.get('/login', (req, res)=>{
  res.render('students/login.ejs', {message: req.session.message || ""})
});

//Register Route
router.get('/register', (req, res)=>{
  res.render('students/register.ejs', {})
});

//Verify Login

router.post('/login', (req, res)=>{
  Student.findOne({email: req.body.username}, (err, user)=>{
    if(user){

      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.message = "";
        req.session.username = req.body.username;
        req.session.logged = true;
        console.log(req.session, req.body);
        res.redirect('/students')

      } else {
          console.log('else in bcrypt compare')
          req.session.message = "Oops! Your email or password are incorrect.";
          res.redirect('/sessions/login')
      }
    } else {
      req.session.message = "Oops! Your email or password are incorrect.";
      res.redirect('/sessions/login')
    }
  });
});

// Register

router.post('/register', (req, res)=>{
  //hash password
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  //create db entry
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash
  userDbEntry.firstName = req.body.firstName;
  userDbEntry.lastName = req.body.lastName;

  //put password in db
  Student.create(userDbEntry, (err, user)=>{
    console.log(user);

  //setup session with login info
  req.session.username = user.username;
  req.session.logged = true;
  res.redirect('/students/:id')
  });
});

//must be logged in to see student profiles / Friday classroom

module.exports = router;
