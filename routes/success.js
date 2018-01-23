var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('success');
});


module.exports = router;


