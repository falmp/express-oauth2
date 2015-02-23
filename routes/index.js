var express = require('express');
var debug = require('debug')('express-oauth2:routes');

module.exports = function(passport) {
  var router = express.Router();

  router.get('/', function(req, res, next) {
    res.render('index');
  });
  
  router.get('/auth/logout', function(req, res, next) {
    req.logout();

    req.flash('success', 'You are now logged out.');

    res.redirect('/');
  });
  
  router.get('/auth/login', passport.authenticate('bioid'));
  
  router.get('/auth/callback', passport.authenticate('bioid', {
    failureRedirect: '/',
    successFlash: 'Welcome, you are now logged in.',
    failureFlash: true
  }), function(req, res, next) {
    var url = req.session.login_redirect || '/profile';

    delete req.session.login_redirect;

    debug('user is logged in and will be redirected to %s', url);

    res.redirect(url);
  });

  router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile');
  });

  router.get('/protected', isLoggedIn, function(req, res, next) {
    res.render('protected');
  });
  
  return router;
};

var isLoggedIn = function(req, res, next) {
  debug('is user logged in? %s', req.isAuthenticated());
  
  if (req.isAuthenticated())
    return next();
  
  debug('user will be redirected to %s', req.url);

  req.flash('error', 'The page you are accessing is protected, please log in.');

  req.session.login_redirect = req.url;

  res.redirect('/');
}