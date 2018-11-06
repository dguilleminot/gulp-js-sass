'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// clean css


var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _precss = require('precss');

var _precss2 = _interopRequireDefault(_precss);

var _scssfmt = require('scssfmt');

var _scssfmt2 = _interopRequireDefault(_scssfmt);

var _stripCssComments = require('strip-css-comments');

var _stripCssComments2 = _interopRequireDefault(_stripCssComments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scssjs = function () {
  function Scssjs() {
    _classCallCheck(this, Scssjs);

    this.file = undefined;
  }

  _createClass(Scssjs, [{
    key: 'init',
    value: function init(target) {
      var result = this.clean(target);
      var content = result.content + '\n';
      var preContent = result.preContent + '\n';
      var finalContent = preContent + '\n' + content;

      return _precss2.default.process(finalContent).then(function (data) {
        return data.css;
      }).catch(function (err) {
        console.log(err);
        return err;
      });
    }
  }, {
    key: 'clean',
    value: function clean(target) {
      // formating and cleaning target
      // then transform in array
      this.file = (0, _scssfmt2.default)((0, _stripCssComments2.default)(target)).split('\n');

      // remove css comments written with //
      // and @import of file (without url())
      _lodash2.default.remove(this.file, function (item) {
        var startString = item.trim().substring(0, 2);
        return item === '' || item !== '' && startString === '//' || item.match('@import') && !item.match('url');
      });

      return this.sort();
    }
  }, {
    key: 'sort',
    value: function sort() {
      // precontent = $variable to prepend
      // content = declaration to append
      var result = {
        preContent: [],
        content: []

        // get type of each line and push it in the right array
      };for (var i = 0; i < this.file.length; i++) {
        var type = this.getType(this.file[i]);
        if (type === 'variable') {
          result.preContent.push(this.file[i]);
        } else {
          result.content.push(this.file[i]);
        }
      }

      // join them in one
      result.preContent = result.preContent.join('\n');
      result.content = result.content.join('\n');
      return result;
    }
  }, {
    key: 'getType',
    value: function getType(line) {
      var targetTrimed = line.trim();
      var wordsArr = targetTrimed.split(' ');
      var firstWord = wordsArr[0];
      var firstType = firstWord.length !== 1 ? firstWord.substring(0, 1) : firstWord;
      var lastWord = wordsArr[wordsArr.length - 1];
      var lastType = lastWord.length !== 1 ? lastWord.substring(lastWord.length - 1, lastWord.length) : lastWord;

      var type = undefined;

      if (lastType === '{' || lastType === ',') {
        return type = 'selector';
      }

      if (firstType === '$') {
        return type = 'variable';
      }

      if (firstWord === '@import') {
        return type = 'import';
      }

      if (firstWord === '}') {
        return type = 'closingBrace';
      }

      // declared after all because this.type = undefined
      if (!type) {
        return type = 'property';
      }
    }
  }]);

  return Scssjs;
}();

exports.default = Scssjs;