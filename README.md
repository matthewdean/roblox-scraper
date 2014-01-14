roblox-scraper
==============

#####Usage

```javascript
var roblox = require('roblox-scraper')

roblox.getUserId('builderman', function(err, userId) {
  console.log(userId) // 156
  roblox.getAssetsFromProfile(userId, 'Heads', function(heads) {
    console.log(heads)
  })
})
```

Output:

```javascript
[{
  name: 'Barrel',
  id: 6340170,
  priceInRobux: 800,
  creatorName: 'ROBLOX'
}, {
  name: 'Flat Top',
  id: 6340208,
  priceInRobux: 50,
  creatorName: 'ROBLOX'
}]
```


