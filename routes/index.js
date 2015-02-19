var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/protected', function(req, res, next) {
  res.render('protected');
});

module.exports = router;
