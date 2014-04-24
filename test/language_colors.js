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
    it('passes a languages object to the callback');
  });
});
