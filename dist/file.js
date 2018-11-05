'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// file treatment


// clean css


var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lineByLine = require('line-by-line');

var _lineByLine2 = _interopRequireDefault(_lineByLine);

var _scssfmt = require('scssfmt');

var _scssfmt2 = _interopRequireDefault(_scssfmt);

var _stripCssComments = require('strip-css-comments');

var _stripCssComments2 = _interopRequireDefault(_stripCssComments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var File = function () {
  function File() {
    _classCallCheck(this, File);

    this.file = undefined;
    this.hierarchy = 0;
    this.content = {};
    this.path = undefined;
    this.content = [];
  }

  _createClass(File, [{
    key: 'init',
    value: function init(target) {
      // extract & clean alls comments
      this.file = (0, _scssfmt2.default)((0, _stripCssComments2.default)(_fs2.default.readFileSync(target, 'utf-8'))).split('\n');

      _lodash2.default.remove(this.file, function (item) {
        var startString = item.trim().substring(0, 2);

        return item === '' || item !== '' && startString === '//';
      });

      this.sortByhierarchy();
    }
  }, {
    key: 'sortByhierarchy',
    value: function sortByhierarchy() {
      var _this = this;

      console.log(this.file);
      // calculer les espaces
      for (var i = 0; i < this.file.length; i++) {
        var target = this.file[i];
        var targetTrimed = target.trim();
        var wordsArr = targetTrimed.split(' ');
        var firstWord = wordsArr[0];
        var firstType = firstWord.length !== 1 ? firstWord.substring(0, 1) : firstWord;
        var lastWord = wordsArr[wordsArr.length - 1];
        var lastType = lastWord.length !== 1 ? lastWord.substring(lastWord.length - 1, lastWord.length) : lastWord;
        var type = undefined;
        var hierarchy = Number(target.search(/\S/)) / 2;

        // is selector
        if (lastType === '{' || lastType === ',') {
          type = 'selector';
          console.log(i, 'this is ', type, hierarchy);
        }

        // is variable
        if (firstType === '$') {
          type = 'variable';
        }

        // is import
        if (firstWord === '@import') {
          type = 'import';
        }

        // is trailing }
        if (firstWord === '}') {
          type = 'closingBrace';
        }

        // is property -> must be declared after all because this.type = undefined
        if (!type) {
          type = 'property';
          // hierarchy start to 0
          hierarchy = hierarchy === 1 ? hierarchy : hierarchy / 2;
        }

        this[type](targetTrimed, hierarchy);
      }

      return Promise.all(this.file).then(function () {
        console.log("finish alll");
        console.log(_this.file);
      });
    }
  }, {
    key: 'selector',
    value: function selector(target, hierarchy) {
      console.log("selector");
      // if hierarchy !== 0
      // get the parent selector to retrieved
      // √ TOUGHT ABOUT: .selector, √
      var selector = '';
      if (hierarchy) {
        var parentIndex = hierarchy - 1;
        var parentSelectorL = this.content[parentIndex].selector.length;
        selector = this.content[parentIndex].selector.substring(0, parentSelectorL - 2) + ' ' + target;
      } else {
        selector = target;
      }

      return this.content[hierarchy] = {
        selector: selector,
        hierarchy: hierarchy,
        content: {}
      };
    }
  }, {
    key: 'variable',
    value: function variable() {
      console.log("variable");
      // get variable
    }
  }, {
    key: 'import',
    value: function _import() {
      console.log("import");
      // match url
      // if no delete
    }
  }, {
    key: 'closingBrace',
    value: function closingBrace() {
      // target.isEnded = true;
      console.log("closingBrace");
    }
  }, {
    key: 'property',
    value: function property() {
      console.log('property');
      // find is has variable
      // true -> remplace by value
      // functions
      // mixin
    }
  }]);

  return File;
}();

exports.default = File;