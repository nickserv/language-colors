var express = require('express');
var router = express.Router();
var languageColors = require('../language_colors');

// GET home page
languageColors.get(function (languages) {
  // HTML
  router.get('/', function(req, res) {
    res.render('index', { languages: languages });
  });

  // JSON
  router.get('/index.json', function(req, res) {
    res.json(languages);
  });
});

module.exports = router;
