var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController = require('../controllers/users');

// users resource paths:
router.get('/users',     usersController.index);
router.post('/users',    usersController.create);
router.post('/login', 	 usersController.login);
router.get('/users/:id', usersController.show);

module.exports = router;
