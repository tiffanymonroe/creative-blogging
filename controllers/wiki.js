//Dependencies
const express = require('express');
const router = express.Router();
const Wiki = require('../models/wiki.js')

//Index Route
router.get('/', (req, res)=>{
  res.render('wiki/index.ejs');
});



module.exports = router;
