# roblox-scraper
A simple node.js library which extracts data from roblox.com. If there is a ROBLOX web API for it, there is no need to include it in this library.

The API is unstable. Please report bugs or request features with the [issue tracker](https://github.com/matthewdean/roblox-scraper/issues).

## Usage

```javascript
var roblox = require('roblox-scraper');
```

### Get assets owned by a given user
```javascript
roblox.getUser('Shedletsky').getAssets(roblox.AssetType.Place, function(err, places) {
  console.log(places[places.length-2]);
});
```

Since [Shedletsky](http://www.roblox.com/user.aspx?id=261)'s second-to-last place is [Sword Fights on the Heights IV](http://www.roblox.com/Sword-Fights-on-the-Heights-IV-place?id=47324), this is the output:

```javascript
{
  name: "Sword Fights on the Heights IV",
  id: 47324,
  creator: { name: "Shedletsky", id: 261 }
}
```

Remember: an asset will always have `name`, `id`, and `creator` fields.

Here is another example of an asset. The `serialNumber` and `serialNumberTotal` fields are defined because `isLimitedUnique` is true.

```javascript
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

Keep in mind that ROBLOX's copy of a limited unique asset will be `isLimited` instead of `isLimitedUnique`, because it has no serial number and is thus not "unique".

## License

(The MIT License)

Copyright (c) 2014 Matthew Dean

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
