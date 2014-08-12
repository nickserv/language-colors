var express = require('express');
var router = express.Router();
var moment = require('moment');
var languageColors = require('../language_colors');

// GET home page
languageColors.get(function (languages, updated) {
  // HTML
  router.get('/', function(req, res) {
    res.render('index', {
      languages: languages,
      updated: moment(updated).fromNow()
    });
  });

  // JSON
  router.get('/index.json', function(req, res) {
    res.json({
      languages: languages,
      updated: updated
    });
  });
});

module.exports = router;
