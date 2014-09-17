var request = require('request'),
	url = require('url'),
	requestWithEncoding = require('./request-with-encoding.js'),
	profile = require('./profile.js'),
	cheerio = require('cheerio'),
	AssetType = require('./asset-type.js');

function getAssetTypePlural(assetTypeId) {
	switch (assetTypeId) {
		case AssetType.Image:        return 'Images';
		case AssetType.TeeShirt:     return 'T-Shirts';
		case AssetType.Audio:        return 'Audio';
		case AssetType.Mesh:         return 'Meshes';
		case AssetType.Lua:          return 'Lua';
		case AssetType.HTML:         return 'HTML';
		case AssetType.Text:         return 'Text';
		case AssetType.Hat:          return 'Hats';
		case AssetType.Place:        return 'Places';
		case AssetType.Model:        return 'Models';
		case AssetType.Shirt:        return 'Shirts';
		case AssetType.Pants:        return 'Pants';
		case AssetType.Decal:        return 'Decals';
		case AssetType.Avatar:       return 'Avatars';
		case AssetType.Head:         return 'Heads';
		case AssetType.Face:         return 'Faces';
		case AssetType.Gear:         return 'Gear';
		case AssetType.Badge:        return 'Badges';
		case AssetType.GroupEmblem:  return 'Group Emblems';
		case AssetType.Animation:    return 'Animations';
		case AssetType.Arms:         return 'Arms';
		case AssetType.Legs:         return 'Legs';
		case AssetType.Torso:        return 'Torsos';
		case AssetType.RightArm:     return 'Right Arms';
		case AssetType.LeftArm:      return 'Left Arms';
		case AssetType.LeftLeg:      return 'Left Legs';
		case AssetType.RightLeg:     return 'Right Legs';
		case AssetType.Package:      return 'Packages';
		case AssetType.YouTubeVideo: return 'YouTubeVideos';
		case AssetType.GamePass:     return 'Game Passes';
		case AssetType.App:          return 'Apps';
		case AssetType.Code:         return 'Codes';
		case AssetType.Plugin:       return 'Plugins';
		default:                     return null;
	}
}

function User(arg) {
	if (typeof arg === 'number') {
	  this.id = arg;
	} else {
	  this.name = arg;
	}
}

User.prototype.getId = function(callback) {
	if (this.id) {
	  callback(null, this.id);
	} else {
	  request({ method: 'HEAD', url: 'http://www.roblox.com/user.aspx?username=' + this.name,	followRedirect: false }, function(err, res) {
			if (err) {
				callback(err);
			} else if (res.headers.location === '/Error/DoesntExist.aspx') {
				callback(new Error('invalid username'));
			} else {
				callback(null, parseInt(url.parse(res.headers.location, true).query.ID, 10));
			}
		});
	}
};

User.prototype.getAssets = function(assetType, maxPages, callback) {

	if (typeof callback === 'undefined') {
	  callback = maxPages;
	  maxPages = 1;
	}
	
	assetType = getAssetTypePlural(assetType);
	if (assetType === null) {
		callback(new Error('invalid asset type'));
		return;
	}

	this.getId(function(err, userId) {
		if (err) {
			callback(err);
			return;
		}
		
		var url = 'http://www.roblox.com/user.aspx?id=' + userId;
		requestWithEncoding({ method: 'GET', url: url }, function(err, res, body) {
			var assets = [];
			var $ = cheerio.load(body);
			
			var readAssetsFromProfile = function(err, res, body) {
				maxPages--;
				var $ = cheerio.load(body);
				var page = new profile($);
				assets = assets.concat(page.assets);
				var morePages = maxPages > 0 && page.currentPage < page.totalPages;
				if (!morePages) {
					callback(null, { totalPages: page.totalPages, assets: assets });
					return;
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
				}, readAssetsFromProfile);
			};
			
			var button = $('.verticaltab > a').filter(function() {
				return $(this).text() === assetType;
			});
			if (button.length === 0) {
				callback(new Error('invalid asset type'));
			} else if (button.hasClass('selected')) {
				readAssetsFromProfile(err, res, body); // we're already on the right page (Hats)
			} else {
				requestWithEncoding({
					method: 'POST',
					url: url,
					form: {
						__EVENTTARGET: button.attr('href').match(/"([^"]+)/)[1],
						__VIEWSTATE: $('#__VIEWSTATE').val(),
						__EVENTVALIDATION: $('#__EVENTVALIDATION').val(),
						__VIEWSTATEENCRYPTED: ''
					}
				}, readAssetsFromProfile);
			}
		});
	});
};

module.exports = User;
