var bcrypt = require('bcrypt');
var db = require('../db').db;

exports.addUser = function(user, next) {
    bcrypt.hash(user.password, 10, function(err, hash) {

        if (err) {
            return next(err);
        }

        db.tokens.claim({email: user.email.toLowerCase(), token: user.token})
            .then(function(data){

                if(data && data.email == user.email){
                    
                    return db.users.insert({
                        name: user.name,
                        email: user.email.toLowerCase(),
                        password: hash
                    });

                } else {
                    // If we don't match the token then this is an invalid one
                    throw new Error('You have provided an invalid token, '+
                        'or it is not associated with this email.');
                }

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