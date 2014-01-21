var User = require('./lib/user.js');
var AssetType = require('./lib/asset-type.js');

exports.getUser = function(nameOrId) {
	return new User(nameOrId);
};

exports.AssetType = AssetType;