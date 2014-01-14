var requestWithEncoding = require('./lib/request-with-encoding.js'),
	request = require('request'),
	profile = require('./lib/profile.js'),
	cheerio = require('cheerio');


var getAssetsOwnedByUser = function(userId, assetType, maxPages, callback) {
	var url = 'http://www.roblox.com/user.aspx?id=' + userId;
	var assets = [];
	var totalAssets;
	
	requestWithEncoding({ method: 'GET', url: url }, function(err, res, body) {
		var $ = cheerio.load(body);
		var correctAssetType = function() {
			return $(this).text().toLowerCase() == assetType.toLowerCase();
		};
		
		function onResponse(err, res, body) {
			maxPages--;
			var $ = cheerio.load(body);
			var page = new profile($);
			assets = assets.concat(page.assets);
			if (page.currentPage == 1) {
				var assetsPerPage = 18;
				totalAssets = page.assets.length + (page.totalPages * assetsPerPage);
			}
			if (page.currentPage >= page.totalPages || maxPages == 0) {
				callback({ totalAssets: totalAssets, pages: page.currentPage, totalPages: page.totalPages, assets: assets });
				return;
			}
			var controls = {
				__EVENTTARGET: 'ctl00$cphRoblox$rbxUserAssetsPane$FooterPageSelector_Next',
				__VIEWSTATE: $('#__VIEWSTATE').val(),
				__EVENTVALIDATION: $('#__EVENTVALIDATION').val(),
				__VIEWSTATEENCRYPTED: ''
			};
			requestWithEncoding({ method: 'POST', url: url, form: controls }, onResponse);
		}
		
		var button = $('.verticaltab > a').filter(correctAssetType);
		if (button.length == 0) {
			throw new Error('invalid asset type');
		}
		if (button.hasClass('selected')) {
			// we're already on the right page (Hats)
			onResponse(err, res, body);
		} else {
			var eventTarget = button.attr('href').match(/"([^"]+)/)[1];
			var controls = {
				__EVENTTARGET: eventTarget,
				__VIEWSTATE: $('#__VIEWSTATE').val(),
				__EVENTVALIDATION: $('#__EVENTVALIDATION').val(),
				__VIEWSTATEENCRYPTED: ''
			};
			requestWithEncoding({ method: 'POST', url: url, form: controls }, onResponse);
		}
	});
};

var getUserId = function(username, callback) {
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

exports.getUserId = getUserId;

exports.getAssetsOwnedByUser = function(user, assetType, maxPages, callback) {
	if (typeof callback == "undefined") {
		callback = maxPages;
		maxPages = 1;
	}
	if (typeof user == 'number') {
		getAssetsOwnedByUser(userId, assetType, maxPages, callback);
	} else {
		getUserId(user, function(err, userId) {
			getAssetsOwnedByUser(userId, assetType, maxPages, callback)
		})
	}
};