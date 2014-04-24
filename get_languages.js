var request = require('request');

module.exports = function (callback) {
  var languagesURL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';

  request(languagesURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      callback(body);
    } else {
      callback(undefined);
    }
  });
};
