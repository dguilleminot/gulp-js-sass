'use strict';

var _readVinylFileStream = require('read-vinyl-file-stream');

var _readVinylFileStream2 = _interopRequireDefault(_readVinylFileStream);

var _main = require('./main.js');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (opts) {
	opts = opts || {};

	return (0, _readVinylFileStream2.default)(function (content, file, stream, cb) {
		if (/^n/.test(content)) {
			return cb(null, content);
		}

		new _main2.default().init(content).then(function (result) {
			return cb(null, result);
		}).catch(function (err) {
			console.log(err);
		});
	});
};