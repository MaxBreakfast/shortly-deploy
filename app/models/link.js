var db = require('../config');
var crypto = require('crypto');


db.urlSchema.pre('save', function(next) {
  console.log('EVERYTHING IS AWESOME!!!!')
  var shasum = crypto.createHash('sha1');
  shasum.update(this.get('url'));
  this.set('code', shasum.digest('hex').slice(0, 5));
  next();
})

var URL = db.mongoose.model('Url', db.urlSchema)

module.exports = URL;
