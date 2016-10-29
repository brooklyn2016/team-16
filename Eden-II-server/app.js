var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('mongoose');

var HOST = '0.0.0.0';
var PORT = 3000;
var API_URL = '/api';

var app = express();

var userRoutes = require( path.join(__dirname, 'routes', 'userRoutes.js'));
var groupHomeRoutes = require( path.join(__dirname, 'routes', 'groupHomeRoutes.js') );
var accountRoutes = require( path.join(__dirname, 'routes', 'account.js') );
var user = require(path.join(__dirname, 'models', 'userModel.js'));

passport.use(new localStrategy(
    function(username, password, done) {
      user.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
));

passport.serializeUser(function(user, done){
  done(user.Id);
});
passport.deserializeUser(function(user, done){
  done({id: Id});
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//who needs a view engine?
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use(path.join(API_URL, 'users'), userRoutes);
app.use(path.join(API_URL, 'groupHomes'), groupHomeRoutes);
app.use(API_URL, accountRoutes);

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
mongoose.connect('mongodb://localhost/edenII');
app.listen(PORT, HOST);