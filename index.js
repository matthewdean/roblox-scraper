var user = require('./lib/user.js')

exports.user = function(arg) {
  return new user(arg)
}