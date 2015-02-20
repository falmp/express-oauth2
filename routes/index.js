var express = require('express');
var debug = require('debug')('express-oauth2:routes');

module.exports = function(passport) {
  var router = express.Router();

  router.get('/', function(req, res, next) {
    res.render('index');
  });
  
  router.get('/auth/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
  });
  
  router.get('/auth/login', passport.authenticate('bioid', {
    successFlash: 'Welcome!',
    failureFlash: 'Ops!'
  }));
  
  router.get('/auth/callback', passport.authenticate('bioid', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

  router.get('/protected', isLoggedIn, function(req, res, next) {
    res.render('protected');
  });
  
  return router;
};

var isLoggedIn = function(req, res, next) {
  debug('is user logged in? %s', req.isAuthenticated());
  
  if (req.isAuthenticated())
    return next();
  
  res.redirect('/');
}