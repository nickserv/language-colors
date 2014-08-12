var assert = require('assert');
var languageColors = require('../language_colors');

describe('languageColors', function(){
  describe('.languagesURL', function(){
    it('exists', function (){
      assert(languageColors.languagesURL);
    });
  });

  describe('.filterColors()', function(){
    it('filters an empty object', function(){
      assert.deepEqual({}, languageColors.filterColors({}));
    });

    it('filters a filled out object', function(){
      assert.deepEqual({
        JavaScript: 'yellow',
        Ruby: 'red'
      }, languageColors.filterColors({
        HipsterScript: {},
        JavaScript: { color: 'yellow' },
        Ruby: { color: 'red' }
      }));
    });
  });

  describe('.get()', function(){
    it('returns a Promise', function(done){
      languageColors.get().then(function (result) {
        // both parameters are defined
        assert(result.languages);
        assert(result.updated);

        // languages is not empty
        var languageNames = Object.keys(result.languages);
        assert(languageNames.length > 1);

        // languages is an object with String keys and String color values
        var hexColorRegExp = /^#[0-9A-Fa-f]{3,6}$/;
        assert(languageNames.every(function (languageName) {
          return result.languages[languageName].match(hexColorRegExp);
        }));

        done();
      }, function () {
        assert.fail();
      })
    });
  });
});
