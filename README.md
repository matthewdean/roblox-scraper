roblox-scraper
==============

#####Usage

```javascript
var roblox = require('roblox-scraper')

// this method takes username or user ID as its first argument
roblox.getAssetsOwnedByUser('shedletsky', 'hats', 1, function(result) {
  console.log('shedletsky has ' + result.totalAssets + ' hats'); // 1080
  var limitedUniques = result.assets.filter(function(hat) {
	return hat.isLimitedUnique;
  });
  limitedUniques.forEach(function(limited) {
    console.log('#' + limited.serialNumber + '/' + limited.totalSold + ' ' + limited.name);
  });
});
```

Output:

```
	shedletsky has 1080 hats
	#237/300 Mr X
	#170/300 Mr X
	#43/300 Mr X
	#411/500 Mr. Fancy Top Hat
	#29/500 Mr. Fancy Top Hat
	#1754/2500 Sapphire Vision Visor
	#1490/2500 Sapphire Vision Visor
	#3249/5000 Noob Attack: Periastron Punishment
	#1418/5000 Noob Attack: Periastron Punishment
	#1329/5000 Noob Attack: Periastron Punishment
	#1198/5000 Noob Attack: Periastron Punishment
	#835/5000 Noob Attack: Periastron Punishment
	#3706/10000 Sk12r Boi
	#460/10000 Sk12r Boi
	#1326/2000 Raig Tree
	#159/2000 Raig Tree
```

Get all of a user's models:

```javascript
roblox.getAssetsOwnedByUser('gusmanak', 'models', function(result) {
  console.log(result.assets[0]) // { name: 'Pain Region Brick', id: 141537523, creatorName: 'stickmasterluke' }
})
```