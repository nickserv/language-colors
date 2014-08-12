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
    it('passes a languages object to the callback', function(done){
      languageColors.get(function (languages, updated) {
        // both parameters are defined
        assert(languages);
        assert(updated);

        // languages is not empty
        var languageNames = Object.keys(languages);
        assert(languageNames.length > 1);

        // languages is an object with String keys and String color values
        var hexColorRegExp = /^#[0-9A-Fa-f]{3,6}$/;
        assert(languageNames.every(function (languageName) {
          return languages[languageName].match(hexColorRegExp);
        }));

        done();
      })
    });
  });
});
