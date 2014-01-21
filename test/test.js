var roblox = require('../');

exports["ROBLOX's profile page has 18 hats"] = function(test) {
	roblox.getUser(1).getAssets(roblox.AssetType.Hat, function(err, result) {
		test.ifError(err);
		test.equal(result.assets.length, 18);
		test.done();
	});
};

exports["Invalid asset types fail"] = function(test) {
	roblox.getUser(261).getAssets(roblox.AssetType.Invalid, function(err, result) {
		test.ok(err !== null, 'should have thrown');
		test.done();
	});
};