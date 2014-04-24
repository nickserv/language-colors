var request = require('request');
var yaml = require('js-yaml');

module.exports = function (callback) {
  var languagesURL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';

  request(languagesURL, function (error, response, body) {
    var languages = JSON.stringify(yaml.safeLoad(body), null, '    ');

    if (!error && response.statusCode === 200) {
      callback(languages);
    } else {
      callback(undefined);
    }
  });
};
