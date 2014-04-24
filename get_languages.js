var https = require('https');
var yaml = require('js-yaml');

module.exports = function (callback) {
  var languagesURL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';
  var body = '';

  https.get(languagesURL, function(res) {
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      var languages = yaml.safeLoad(body);

      Object.keys(languages).forEach(function (languageName) {
        if (languages[languageName]) {
          languages[languageName] = languages[languageName].color;
        } else {
          delete languages[languageName];
        }
      });

      callback(languages);
    });
  }).on('error', function(e) {
    callback(undefined);
  });
};
