var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController = require('../controllers/users');
var authController = require('../controllers/auth');

// users resource paths:
router.get('/users',     authController.isLoggedIn, usersController.index);
router.post('/users',    usersController.create);
router.post('/login', 	 usersController.login);
router.get('/users/:id', usersController.show);

module.exports = router;
