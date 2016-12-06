	var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var userSchema = new mongoose.Schema({
  email:   String,
  password_digest: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
