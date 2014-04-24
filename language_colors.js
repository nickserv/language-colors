var https = require('https');
var yaml = require('js-yaml');

var languagesURL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';

function filterColors(languages) {
  return Object.keys(languages).reduce(function (memo, languageName) {
    var color = languages[languageName].color;

    if (color) {
      memo[languageName] = color;
    }
    return memo;
  }, {});
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
