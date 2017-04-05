var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var autoprefixer = require('express-autoprefixer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(autoprefixer());
app.use(express.static(path.join(__dirname, 'public')));

var moment = require('moment');
var languageColors = require('./language_colors');

// GET home page
languageColors.get(function (languages, updated) {
  // HTML
  app.get('/', function(req, res) {
    res.render('index', {
      languages: languages,
      updated: moment(updated).fromNow()
    });
  });

  // JSON
  app.get('/index.json', function(req, res) {
    res.json({
      languages: languages,
      updated: updated
    });
  });

  /// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  /// error handlers

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
});


module.exports = app;
