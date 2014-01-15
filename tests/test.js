var roblox = require('../')

exports['roblox owns crossroads'] = function(test) {
	roblox.user('roblox').hasAsset(1818, function(err, value) {
	  test.ok(value, 'ROBLOX should own Crossroads')
		test.done()
	})
}

exports['shedletsky doesnt own crossroads'] = function(test) {
	roblox.user('shedletsky').hasAsset(1818, function(err, value) {
		test.ok(!value, 'Shedletsky should not own Crossroads')
		test.done()
	})
}

exports['roblox first page of hats'] = function(test) {
	roblox.user(1).getAssets('hats', function(err, result) {
		if (err) throw err
		test.equal(result.assets.length, 18, "ROBLOX's first page of hats is not 18 hats")
		test.done()
	})
}