var request = require('request'),
	url = require('url'),
  requestWithEncoding = require('./request-with-encoding.js'),
  profile = require('./profile.js'),
  cheerio = require('cheerio')

function user(arg) {
  if (typeof arg == 'number')
    this.id = arg
  else
    this.name = arg
}

user.prototype.hasAsset = function(assetId, callback) {
	this.getId(function(err, userId) {
		if (err)
			callback(err)
		else
			request('http://api.roblox.com/Ownership/HasAsset?userId=' + userId + '&assetId=' + assetId, function(err, res, body) {
				if (err)
					callback(err)
				else if (res.statusCode != 200)
					callback(new Error('invalid status code'))
				else
					callback(null, body == 'true')
			})
	})
}

user.prototype.getId = function(callback) {
  if (this.id)
    callback(null, this.id)
  else
    request({ method: 'HEAD', url: 'http://www.roblox.com/user.aspx?username=' + this.name,	followRedirect: false }, function(err, res, body) {
			if (err)
				callback(err)
			else if (res.headers.location == '/Error/DoesntExist.aspx')
				callback(new Error('invalid username'))
			else
				callback(null, parseInt(url.parse(res.headers.location, true).query.ID))
		})
}

user.prototype.getAssets = function(assetType, maxPages, callback) {

  if (!callback) {
    callback = maxPages
    maxPages = 1
  }

	this.getId(function(err, userId) {
	
	  if (err) {
		  callback(err)
			return
		}
		
		var url = 'http://www.roblox.com/user.aspx?id=' + userId
		requestWithEncoding({ method: 'GET', url: url }, function(err, res, body) {
		  var assets = []
			var $ = cheerio.load(body)
			var correctAssetType = function() {
				return $(this).text().toLowerCase() == assetType.toLowerCase()
			}
			
			var readAssetsFromProfile = function(err, res, body) {
				maxPages--
				var $ = cheerio.load(body)
				var page = new profile($)
				assets = assets.concat(page.assets)
				if (page.currentPage >= page.totalPages || maxPages == 0) {
					callback(null, { totalPages: page.totalPages, assets: assets })
					return
				}
				requestWithEncoding({
					method: 'POST',
					url: url,
					form: {
						__EVENTTARGET: 'ctl00$cphRoblox$rbxUserAssetsPane$FooterPageSelector_Next',
						__VIEWSTATE: $('#__VIEWSTATE').val(),
						__EVENTVALIDATION: $('#__EVENTVALIDATION').val(),
						__VIEWSTATEENCRYPTED: ''
					}
				}, readAssetsFromProfile)
			}
			
			var button = $('.verticaltab > a').filter(correctAssetType)
			if (button.length == 0)
				callback(new Error('invalid asset type'))
			else if (button.hasClass('selected'))
			  readAssetsFromProfile(err, res, body) // we're already on the right page (Hats)
			else
				requestWithEncoding({
				  method: 'POST',
					url: url,
					form: {
						__EVENTTARGET: button.attr('href').match(/"([^"]+)/)[1],
						__VIEWSTATE: $('#__VIEWSTATE').val(),
						__EVENTVALIDATION: $('#__EVENTVALIDATION').val(),
						__VIEWSTATEENCRYPTED: ''
					}
				}, readAssetsFromProfile)
		});
	})
}

module.exports = user