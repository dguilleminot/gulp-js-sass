'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// file treatment


// private


var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _file = require('./file.js');

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scssjs = function () {
  function Scssjs() {
    _classCallCheck(this, Scssjs);

    this.origin = './test/client/app';
    this.subFoldersPath = [];
    this.scssPath = [];
  }

  _createClass(Scssjs, [{
    key: 'init',
    value: function init(options) {
      // set some vars
      // TODO: spread operator with option

      // then trigger the extract
      this.subFoldersPath.push(this.origin);
      this.initExtractFolderContent();
    }
  }, {
    key: 'initExtractFolderContent',
    value: function initExtractFolderContent() {
      var _this = this;

      var target = this.subFoldersPath[0];
      this.extractFolderContent(target).then(function () {
        var nextOne = _this.subFoldersPath[1];
        _this.subFoldersPath.shift();
        if (nextOne) {
          // recursive function
          _this.initExtractFolderContent();
        } else {
          // or leave to an another extract
          _this.initExtractScssFileContent();
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: 'extractFolderContent',
    value: function extractFolderContent(folderPath) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _fs2.default.readdir(folderPath, function (err, items) {

          for (var i = 0; i < items.length; i++) {

            var target = items[i];
            var subPath = _path2.default.resolve(folderPath, target);
            var isDir = _fs2.default.lstatSync(subPath).isDirectory();

            // SCSS
            if (target.match('.scss')) {
              _this2.scssPath.push(subPath);
            }

            // DIR
            if (isDir) {
              _this2.subFoldersPath.push(subPath);
            }
          }

          return Promise.all(items).then(function () {
            resolve();
          });
        });
      });
    }
  }, {
    key: 'initExtractScssFileContent',
    value: function initExtractScssFileContent() {
      for (var i = 0; i < this.scssPath.length; i++) {

        var target = this.scssPath[i];

        var content = new _file2.default().init(target);
        console.log('finish for main class for the moment');
      }
    }
  }]);

  return Scssjs;
}();

exports.default = Scssjs;