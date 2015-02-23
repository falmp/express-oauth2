var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var swig = require('swig');
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2');
var debug = require('debug')('express-oauth2:app');
var flash = require('connect-flash');
var RedisStore = require('connect-redis')(session);

var app = express();

OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
  debug('requesting user profile with access token %s', accessToken);
 
  this._oauth2.get('http://localhost:3001/oauth/users/info', accessToken, function (err, body, res) {
    var json;
    
    if (err) {
      if (err.data) {
        try {
          json = JSON.parse(err.data);
        } catch (_) {}
      }
      
      return done(new Error('failed to fetch user profile', err));
    }
    
    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('failed to parse user profile'));
    }
    
    json.provider = 'bioid';
  
    return done(null, json);
  });
}

passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
  done(null, JSON.parse(user));
});

passport.use('bioid', new OAuth2Strategy({
  authorizationURL: 'http://localhost:3001/oauth/authorize',
  tokenURL: 'http://localhost:3001/oauth/token',
  clientID: 'infonexo-web',
  clientSecret: '123',
  callbackURL: 'http://localhost:3000/auth/callback'
},
function(accessToken, refreshToken, profile, done) {
  debug('access token: %s, profile: %s', accessToken, refreshToken, JSON.stringify(profile));
  done(null, profile.user); // TODO should actually return the user to be stored in req.user
}));

// view engine setup
app.engine('swig', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');
app.set('view cache', false);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new RedisStore({
    host: '127.0.0.1',
    port: 6379,
    prefix: 'express-oauth2.sid:'
  }),
  secret: 'hey you',
  name: 'express-oauth2.sid',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

var routes = require('./routes/index')(passport);
//var users = require('./routes/users');

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
