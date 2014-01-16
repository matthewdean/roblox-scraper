roblox-scraper 0.1.1
==============
A simple node.js library which extracts data from roblox.com

The API is unstable. Please report bugs or request features using the issue tracker.

Please report bugs or suggest features using the [issue tracker](https://github.com/matthewdean/roblox-scraper/issues).

#####Installation
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

#####License (MIT)

Copyright (c) 2014 Matthew Dean

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
