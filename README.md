roblox-scraper
==============

#####Usage

```javascript
var roblox = require('roblox-scraper')

roblox.getUserId('Shedletsky', function(err, userId) {
  console.log(userId) // 261
})

roblox.getAssetsFromProfile('Shedletsky', 'Packages', function(packages) {
  // todo
})
```
