import readFiles from 'read-vinyl-file-stream';
import ScssJs from './main.js';

module.exports = function (opts) {
	opts = opts || {};

	return readFiles(function (content, file, stream, cb) {
	  if (/^n/.test(content)) {
	    return cb(null, content);
	  }

		new ScssJs().init(content).then((result) => {
			return cb(null, result);
		}).catch((err) => {
			console.log(err);
		});
	});
};
