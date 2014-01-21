var request = require('request'),
	zlib = require('zlib');

var requestWithEncoding = function(options, callback) {

	if (typeof options == 'string') {
		options = {
			url: options
		};
	};
	
	// leave response body as a buffer so it can be gunzipped
	options.encoding = null; 
	options.headers = options.headers || {};
	options.headers['Accept-Encoding'] = 'gzip';
	
	var onResponse = function(err, res, body) {
		if (err) {
			callback(err);
			return;
		}
		if (res.headers['content-encoding'] !== 'gzip') {
			callback(null, res, body.toString());
			return;
		}
		zlib.gunzip(body, function(err, body) {
			if (err)
				callback(err);
		  else
				callback(null, res, body.toString());
		});
	};
	
	request(options, onResponse);
};

module.exports = requestWithEncoding;
