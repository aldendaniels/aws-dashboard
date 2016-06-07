var express = require('express');
var router = express.Router();
var db = require('../db').db;
var aws = require('../services/aws-service');

/* GET home page. */
router.get('/', function(req, res, next) {


    // Get the servers and commits from the database
    db.servers.all().then(function(servers){
        return [servers,db.commits.all()];

    // The spread function lets us pass forward values
    // alongside our promises
    }).spread(function(servers,commits){
       
        var vm = {
            title: 'Home',
            servers: servers,
            commits: commits,
            error: req.flash('error'),
        };

        res.render('index', vm);

    }).catch(function(err){
        return next(err);
    });

    

});
module.exports = router;
