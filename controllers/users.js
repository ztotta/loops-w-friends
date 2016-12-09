// Require resource's model(s).
var User = require("../models/user");
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

var login = function (req, res, next) {
  if (!req.body.password || !req.body.email) {
    res.json({ error: "Email and password must be set"})
    return false
  }

  User.findOne({ email: req.body.email })
    .then(function (user) {
      if (user) {
        return bcrypt.compare(req.body.password, user.password_digest)
      }
      else {
        res.json({ error: "User does not exist" })
      }
    })
    .then(function (match) {
      if (match) {
        return jwt.sign({ email: req.body.email }, process.env.JWT_SECRET)
      }
      else {
        res.json({ error: "Passwords don't match" })
      }
    })
    .then(function (token) {
      res.json({ token: token })
    })
}

var create = function (req, res, next) {
  if (!req.body.password || !req.body.email) {
    res.json({ error: "Email and password must be set"})
    return false
  }

  var newUser = new User(req.body)
	
	var payload = { email: req.body.email }
	
  User.findOne({ email: newUser.email })
    .then(function (user) {
      if (user) {
				payload._id = user._id
        res.json({ error: "User exists" })
      }
      else {
        return bcrypt.hash(req.body.password, 10)
      }
    })
    .then(function (hash) {
      newUser.password_digest = hash
      return User.create(newUser)
    })
    .then(function () {
			return jwt.sign({ payload }, process.env.JWT_SECRET)
		})
		.then(token => res.json({ token: token }));
}

var index = function(req, res, next){
  User.find({}, function(err, users) {
    if (err) {
      res.json({message: err});
    } else {
      res.json(users);
    }
  });
};

var show = function(req, res, next){
	if (req.token._id != req.params.id) {
		res.status(403).json({ error: "Wrong user in token" });
		return false
	}
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({message: 'Could not find user because ' + err});
    } else if (!user) {
      res.json({message: 'No user with this id.'});
    } else {
      res.json(user);
    }
  });
};

module.exports = {
  index: index,
  show:  show,
  create: create,
  login: login
};
