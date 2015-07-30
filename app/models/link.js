var db = require('../config');
var crypto = require('crypto');

db.urlSchema.methods.createHash = function() {
  var shasum = crypto.createHash('sha1');
  shasum.update(model.get('url'));
  this.set('code', shasum.digest('hex').slice(0, 5));
}

var Link = db.mongoose.model('Url', db.urlSchema)

module.exports = Link;
