var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config.js');
var userService = require('../services/user-service');

/* GET User Create Form */
router.get('/create', function(req, res, next) {
  var vm = {
    title: 'Create an account'
  };
  res.render('users/create', vm);
});

/* POST new user. */
router.post('/create', function(req, res, next) {
  userService.addUser(req.body, function(err) {
    if (err) {
      var vm = {
        title: 'Create an account',
        input: req.body,
        errors: err
      };
      delete vm.input.password;
      return res.render('users/create', vm);
    }
    req.login(req.body, function(err) {
      res.redirect('/home');
    });
  });
});

/* POST users login. */
router.post('/login',
  function(req,res,next){
    req.session.personName = 'User';
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = config.cookieMaxAge;
    }
    next();
  },
  passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: 'Invalid credentials',
    successRedirect: '/home'
  }));

/* GET user logout. */
router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
