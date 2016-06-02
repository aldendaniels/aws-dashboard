/*
 * USER MODEL
 * Mongoose based user model for storing the user in MongoDB
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userService = require('../services/user-service');

var userSchema = new Schema({
  name: {type: String, required: 'Please enter your full name.'},
  email: {type: String, required: 'Please enter a valid email.'},
  password: {type: String, required: 'You must have a password.'},
  created: {type: Date, default: Date.now}
});

// Duplicate email validation checking
userSchema.path('email').validate(function(value, next) {
  userService.findUser(value, function(err, user){
    if(err){
      console.log(err);
      return next(false);
    }

    next(!user);
  });
}, 'That email is already in use.');

// Grab the mongoose model for our use
var User = mongoose.model('User',userSchema);

module.exports = {
  User: User
};