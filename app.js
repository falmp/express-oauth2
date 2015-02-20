var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var debug = require('debug')('express-oauth2:app');

var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

passport.use('bioid', new OAuth2Strategy({
  authorizationURL: 'https://www.provider.com/oauth2/authorize',
  tokenURL: 'https://www.provider.com/oauth2/token',
  clientID: 'infonexo-web',
  clientSecret: '123',
  callbackURL: 'http://localhost:3000/auth/callback'
},
function(accessToken, refreshToken, profile, done) {
  debug('access token: %s, refresh token: %s, profile id: %s', accessToken, refreshToken, profile.id);
  done(err, user);
}));

// view engine setup
app.engine('swig', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');
app.set('view cache', false);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    swig.setDefaults({ cache: false });
    
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
