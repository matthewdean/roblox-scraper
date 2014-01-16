roblox-scraper 0.1.1
==============
This is a library which makes it really easy to grab data from the ROBLOX website. In some cases it fakes ASP.NET postbacks so it's very hacky (but I try to minimize hackiness as much as possible). It relies on the node.js request library for sending HTTP requests and cheerio for parsing HTML.

Please report any bugs/issues you find or if you want to see a new method.

The API is very unstable. Proceed at your own risk.

I try to stick to [semantic versioning](http://semver.org/) as much as possible.

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

#####License

MIT
