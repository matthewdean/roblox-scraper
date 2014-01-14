var request = require('request'),
	zlib = require('zlib');

requestWithEncoding = function(options, callback) {
	if (typeof options == 'string') {
		options = {
			url: options
		};
	};
	options.encoding = null; // leave response body as a buffer so it can be gunzipped
	options.headers = options.headers || {};
	options.headers['Accept-Encoding'] = 'gzip';
	request(options, function(err, res, body) {
		if (err) return callback(err);
		console.assert(res.statusCode == 200, 'not OK');
		console.assert(res.headers['content-encoding'] == 'gzip', 'not gzipped');
		zlib.gunzip(body, function(err, body) {
			if (err) return callback(err);
			callback(null, res, body.toString());
		});
	});
};

module.exports = requestWithEncoding;
