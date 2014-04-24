var https = require('https');
var yaml = require('js-yaml');
var extend = require('util')._extend;

var languagesURL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';

function filterColors(oldLanguages) {
  var languages = extend({}, oldLanguages);

  Object.keys(languages).forEach(function (languageName) {
    if (languages[languageName]) {
      languages[languageName] = languages[languageName].color;
    } else {
      delete languages[languageName];
    }
  });
  return languages;
}

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
