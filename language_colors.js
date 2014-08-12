var Promise = require('es6-promise').Promise;
var request = require('request');
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
exports.get = function () {
  return new Promise(function (resolve, reject) {
    request(exports.languagesURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var languages = exports.filterColors(yaml.safeLoad(body));
        resolve({
          languages: languages,
          updated: new Date()
        });
      } else {
        reject();
      }
    })
  });
};
