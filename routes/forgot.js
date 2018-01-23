var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('forgot', { title: 'Express3' });
});

module.exports = router;
