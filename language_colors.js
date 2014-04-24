var https = require('https');
var yaml = require('js-yaml');

// The URL of the data file with GitHub's language colors.
var languagesURL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';

// Given an Object of languages (from language name Strings to Objects),
// filterColors will return an Object of language name Strings to String hex
// color values, with all color-less languages removed.
function filterColors(languages) {
  return Object.keys(languages).reduce(function (memo, languageName) {
    var color = languages[languageName].color;

    if (color) {
      memo[languageName] = color;
    }
    return memo;
  }, {});
}

// languageColors accepts a callback, downloads GitHub's language colors,
// creates a new languages Object, and passes it to the callback when it is
// ready. The languages Object has String language name keys and String hex
// color values (with leading "#"s).
module.exports = function (callback) {
  var body = '';

  https.get(languagesURL, function(res) {
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      var languages = filterColors(yaml.safeLoad(body));
      callback(languages);
    });
  }).on('error', function(e) {
    callback(undefined);
  });
};
