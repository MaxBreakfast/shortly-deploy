var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });
console.log("THE USER SCHEMA IS BEING USED")



db.userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  console.log("IN COMPARE");
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    console.log("IN COMPARE CALLBACK")
    callback(isMatch);
  });
};

db.userSchema.pre('save', function(next) {
  console.log("HEYYYY");
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
      console.log("inside cipher callback")
      next();
    });
})

db.userSchema.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
};

var User = db.mongoose.model('User', db.userSchema);


module.exports = User;
