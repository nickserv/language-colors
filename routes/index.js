var express = require('express');
var router = express.Router();
var moment = require('moment');
var languageColors = require('../language_colors');

// GET home page
languageColors.get().then(function (result) {
  // HTML
  router.get('/', function(req, res) {
    result.updatedString = moment(result.updated).fromNow();
    res.render('index', result);
  });

  // JSON
  router.get('/index.json', function(req, res) {
    res.json(result.languages);
  });
}, function () {
  throw('color loading failed');
});

module.exports = router;
