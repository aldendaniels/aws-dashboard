var express = require('express');
var router = express.Router();
var db = require('../db').db;
var aws = require('../services/aws-service');
var config = require('../config.js');

/* GET home page. */
router.get('/', function(req, res, next) {


    // Get the servers and commits from the database
    db.servers.all().then(function(servers){
        var getCommits = db.commits.findByOwnerAndRepo({
            owner: config.deploymentRepo.owner,
            repository: config.deploymentRepo.repo
        });

        return [servers,getCommits];

    // The spread function lets us pass forward values
    // alongside our promises
    }).spread(function(servers,commits){
       
        var vm = {
            title: 'Home',
            servers: servers,
            commits: commits,
            repo: config.deploymentRepo.owner + '/' + config.deploymentRepo.repo,
            error: req.flash('error'),
            name: req.user ? req.user.name : 'test'
        };

        res.render('home/index', vm);

    }).catch(function(err){
        return next(err);
    });

});
module.exports = router;
