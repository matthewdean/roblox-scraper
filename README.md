roblox-scraper
==============
API is unstable.

#####Install
```
npm install roblox-scraper
```

#####Usage:
```javascript
var roblox = require('roblox-scraper')
```

#####Get assets owned by a user

```javascript
roblox.user('builderman').getAssets('models', function(err, result) {
  if (err) throw err
  console.log(result)
})
```

#####Check if a user owns an asset:
```javascript
// you can supply userId instead of username
roblox.user(261).hasAsset(1818, function(err, value) {
	if (err) throw err

	console.log('Shedletsky owns Crossroads: ' + value) // Shedletsky owns Crossroads: false
})
```

#####Get user id from username:
```javascript
roblox.user('roblox').getId(function(err, id) {
  if (err) throw err
  console.log(id) // 1
})
```