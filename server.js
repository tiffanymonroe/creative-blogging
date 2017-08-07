//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

//Middleware
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: "this is a random string secret",
    resave: false,
    saveUninitialized: false
}));

//Controllers
const studentsController = require('./controllers/students.js');
app.use('/students', studentsController);

const wikiController = require('./controllers/wiki.js');
app.use('/wiki', wikiController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

//Index Route
app.get('/', (req, res)=>{
  res.render('index.ejs')
});


//Connections

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog';
mongoose.connect(mongoUri);

mongoose.connection.once('open', ()=>{
  console.log('mongo is in the house');
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log("project two, woo hoo!");
  console.log('---------------------------------');
  console.log('Server running on port: ' + port);
  console.log('---------------------------------');
})
