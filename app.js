var express = require('express');
var path = require('path');

// Required modules
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

// Recurring CRON-like scheduled tasks
var tasks = require('./tasks');

// Load our routes
var config = require('./config');
var routes = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var api = require('./routes/api');

// Passport setup
var passportConfig = require('./auth/passport-config');
var restrict = require('./auth/restrict');
passportConfig();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// Handlebars for the win
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(
    {
        secret: 'eWbJpWBhCZQUFko4KTXQaAQb6fcLfW',
        saveUninitialized: false,
        resave: false
    }
));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

// Everything below the "restrict" will require login
app.use(restrict);
app.use('/home', home);
app.use('/api', api);

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
