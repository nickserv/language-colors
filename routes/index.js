var express = require('express');
var router = express.Router();
var languageColors = require('../language_colors');

/* GET home page. */
languageColors(function (languages) {
  router.get('/', function(req, res) {
    res.render('index', { title: 'Language Colors', languages: languages });
  });
  router.get('/index.json', function(req, res) {
    res.json(languages);
  });
});

module.exports = router;
