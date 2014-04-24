var express = require('express');
var router = express.Router();
var getLanguages = require('../get_languages');

/* GET home page. */
getLanguages(function (languages) {
  router.get('/', function(req, res) {
    res.render('index', { title: 'Language Colors', languages: languages });
  });
});

module.exports = router;
