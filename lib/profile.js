var Asset = function($, e) {

	var e = $(e);
	var parsePrice = function(str) {
		str = str.replace(/[^0-9]/g, "");
		return parseInt(str) || null;
	};
	
	this.name = e.find('.AssetName a').text();
	var url = e.find('.AssetName a').attr('href');
	this.id = parseInt(url.match(/=(\d+)/)[1]);
	
	var priceInRobux = parsePrice(e.find('.PriceInRobux').text());
	if (priceInRobux) {
		this.priceInRobux = priceInRobux;
	}
	
	var priceInTickets = parsePrice(e.find('.PriceInTickets').text());
	if (priceInTickets) {
		this.priceInTickets = priceInTickets;
	}
	
	this.creatorName = e.find('.AssetCreator a').text();
	var creatorUrl = e.find('.AssetCreator a').attr('href');
	//asset.CreatorId = parseInt(creatorUrl.match(/=(\d+)/)[1]);
	
	var isLimited = e.find('img[src="/images/assetIcons/limited.png"]').length > 0;
	if (isLimited) {
		this.isLimited = true;
	}

	var isLimitedUnique = e.find('img[src="/images/assetIcons/limitedunique.png"]').length > 0;
	if (isLimitedUnique) {
		this.isLimitedUnique = true;
		var str = e.find('img[src="/images/assetIcons/limitedunique.png"]').parent().next().text().match(/#(\d+) \/ (\d+)/);
		this.serialNumber = parseInt(str[1]);
		this.totalSold = parseInt(str[2]);
	}
	
	if (e.find('.PriceInRobux').text().indexOf('Was') > -1 || e.find('.PriceInTickets').text().indexOf('Was') > -1) {
		this.hasSoldOut = true;
	}
	
	if (e.find('.PriceInTickets div span:contains(Expired)').length > 0) {
		this.hasExpired = true;
	}
};

var Profile = function($) {

	this.currentPage = 1;
	this.totalPages = 1;
	var label = $('#ctl00_cphRoblox_rbxUserAssetsPane_FooterPagerLabel');
	if (label.length > 0) {
		var matches = label.text().match(/Page (\d+) of (\d+)/);
		this.currentPage = parseInt(matches[1]);
		this.totalPages = parseInt(matches[2]);
	}
	var assets = [];
	$('#ctl00_cphRoblox_rbxUserAssetsPane_UserAssetsDataList .Asset').each(function() {
		assets.push(new Asset($, this));
	});
	this.assets = assets;
};

module.exports = Profile;