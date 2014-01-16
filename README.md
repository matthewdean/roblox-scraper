# roblox-scraper
A simple node.js library which extracts data from roblox.com. If there is a ROBLOX web API for it, there is no need to include it in this library.

The API is unstable. Please report bugs or request features with the [issue tracker](https://github.com/matthewdean/roblox-scraper/issues).

## Installation
```bash
npm install mysql
```

## Usage

```javascript
var roblox = require('roblox-scraper');
```

### Get assets owned by a user

```javascript
var user = new roblox.User(261);
user.getAssets(roblox.AssetType.Place, function(err, places) {
  console.log(places[places.length-2]); // second-to-last place
});

{
  name: "Sword Fights on the Heights IV",
  id: 47324,
  creator: { name: "Shedletsky", id: 261 }
}
```

```javascript
var user = new roblox.User('TheGamer101');
user.getAssets(roblox.AssetType.Hat, function(err, hats) {
  var emp = hats.find(function(hat) { return hat.name == "Dominus Empyreus"; });
  console.log(emp);
});

{
  name: "Dominus Empyreus",
  id: 21070012,
  creator: { name: "ROBLOX", id: 1 },
  priceInRobux: 13337,
  isLimitedUnique: true,
  serialNumber: 8,
  serialNumberTotal: 26
}
```

## License

(The MIT License)

Copyright (c) 2014 Matthew Dean

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
