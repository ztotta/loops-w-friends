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
  User.findOne({ email: newUser.email })
    .then(function (user) {
      if (user) {
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
    .then(() => res.json({ email: newUser.email }))
}

var index = function(req, res, next){
  User.find({}, function(err, users) {
    if (err) {
      res.json({message: err});
    } else {
      res.render('users/index', {users: users});
    }
  });
};

var show = function(req, res, next){
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({message: 'Could not find user because ' + err});
    } else if (!user) {
      res.json({message: 'No user with this id.'});
    } else {
      res.render('users/show', {user: user});
    }
  });
};

module.exports = {
  index: index,
  show:  show,
  create: create,
  login: login
};
