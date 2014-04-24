var express = require('express');
var router = express.Router();
var languageColors = require('../language_colors');

// GET home page
languageColors(function (languages) {
  // HTML
  router.get('/', function(req, res) {
    res.render('index', {
      title: 'Language Colors',
      languages: languages
    });
  });

  // JSON
  router.get('/index.json', function(req, res) {
    res.json(languages);
  });
});

module.exports = router;
