//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

//Middleware
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: "english 204",
    resave: false,
    saveUninitialized: false
}));

//Controllers
const studentsController = require('./controllers/students.js');
app.use('/students', studentsController);

const wikiController = require('./controllers/wiki.js');
app.use('/wiki', wikiController);




//Index Route
app.get('/', (req, res)=>{
  res.render('index.ejs')
});


// Seed Data
const Student = require('./models/students.js');
const seedData = require('./models/seed_data.js')
Student.collection.insertMany(seedData, (error, data) => {
  console.log('seeded data');
  mongoose.connection.close();
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
