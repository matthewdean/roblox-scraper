var requestWithEncoding = require('./lib/request-with-encoding.js'),
	request = require('request'),
	profile = require('./lib/profile.js'),
	cheerio = require('cheerio');

exports.getAssetsFromProfile = function(userId, assetType, callback) {
	var url = 'http://www.roblox.com/user.aspx?id=' + userId;
	var assets = [];
	requestWithEncoding({ method: 'GET', url: url }, function(err, res, body) {
		var $ = cheerio.load(body);
		var controls = {
			__EVENTTARGET: $('.verticaltab > a').filter(function() { return $(this).text() == assetType; }).attr('href').match(/"([^"]+)/)[1],
			__VIEWSTATE: $('#__VIEWSTATE').val(),
			__EVENTVALIDATION: $('#__EVENTVALIDATION').val(),
			__VIEWSTATEENCRYPTED: ''
		};
		requestWithEncoding({ method: 'POST', url: url, form: controls }, function onResponse(err, res, body) {
			var $ = cheerio.load(body);
			var page = new profile($);
			assets = assets.concat(page.assets);
			if (page.currentPage < page.totalPages) {
				var controls = {
					__EVENTTARGET: 'ctl00$cphRoblox$rbxUserAssetsPane$FooterPageSelector_Next',
					__VIEWSTATE: $('#__VIEWSTATE').val(),
					__EVENTVALIDATION: $('#__EVENTVALIDATION').val(),
					__VIEWSTATEENCRYPTED: ''
				};
				requestWithEncoding({ method: 'POST', url: url, form: controls }, onResponse);
			} else {
				callback(assets);
			}
		});
	});
};

exports.getUserId = function(username, callback) {
	request({
		method: 'HEAD',
		url: 'http://www.roblox.com/user.aspx?username=' + username,
		followRedirect: false
	}, function(err, res, body) {
		if (err) {
			callback(err);
			return;
		}
		if (res.headers.location == '/Error/DoesntExist.aspx') {
			callback(new Error("no user named " + username));
			return;
		}
		var userId = require('url').parse(res.headers.location, true).query.ID;
		userId = parseInt(userId);
		callback(null, userId);
	});
};