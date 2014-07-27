var https = require('https');
var yaml = require('js-yaml');

// The URL of the data file with GitHub's language colors.
exports.languagesURL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';

// Given an Object of languages (from language name Strings to Objects),
// filterColors will return an Object of language name Strings to String hex
// color values, with all color-less languages removed.
exports.filterColors = function (languages) {
  return Object.keys(languages).reduce(function (memo, languageName) {
    var color = languages[languageName].color;

    if (color) {
      memo[languageName] = color;
    }
    return memo;
  }, {});
};

// get accepts a callback, downloads GitHub's language colors,
// creates a new languages Object, and passes it to the callback when it is
// ready. The languages Object has String language name keys and String hex
// color values (with leading "#"s).
exports.get = function (callback) {
  var body = '';

  https.get(exports.languagesURL, function(res) {
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      var languages = exports.filterColors(yaml.safeLoad(body));
      callback(languages);
    });
  }).on('error', function(e) {
    callback(undefined);
  });
};
