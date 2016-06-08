var bcrypt = require('bcrypt');
var db = require('../db').db;

exports.addUser = function(user, next) {
    bcrypt.hash(user.password, 10, function(err, hash) {

        if (err) {
            return next(err);
        }

        db.users.insert({
            name: user.name,
            email: user.email.toLowerCase(),
            password: hash
        }).then(function(data){
            next(null);
        }).catch(function(err){
            return next(err);
        });
        
    });
};

exports.findUser = function(email, next){
    db.users.find(email.toLowerCase()).then(function(data){
        next(null, data);
    }).catch(function(err){
        next(err, null);
    });
};