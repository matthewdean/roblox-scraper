roblox-scraper
==============

#####Usage:
```javascript
var roblox = require('roblox-scraper')

roblox.getUserId('builderman', function(err, userId) {
  console.log(userId) // 156
})

// get the first page of shedletsky's hats (18 assets per page)
roblox.getAssetsOwnedByUser('shedletsky', 'hats', 1, function(result) {
  console.log(result);
});
```

#####Output:
* fields with default values are omitted for clarity (e.g. isLimited = false)

```javascript
{
  totalAssets: 1080, // shedletsky owns 1080 hats
  totalPages: 59,
  assets: [{
    name: 'Mr X',
    id: 125861676,
    priceInRobux: 1000,
    creatorName: 'ROBLOX',
    isLimitedUnique: true,
    serialNumber: 237,
    totalSold: 300,
    hasSoldOut: true
  }]
}
```

#####Get all the models a user owns:

```javascript
// works with user IDs also
roblox.getAssetsOwnedByUser(156, 'models', function(result) {
  console.log(result.assets[0]) // { name: 'Pain Region Brick', id: 141537523, creatorName: 'stickmasterluke' }
})
```
