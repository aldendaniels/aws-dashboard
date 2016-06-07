/*
 * API Route
 * The collection of functions handling the api calls
 */

var express = require('express');
var _ = require('underscore');
var awsService = require('../services/aws-service');
var githubService = require('../services/github-service');
var config = require('../config');
var htmlencode = require('htmlencode');

// Load the express router
var router = express.Router();

/**
 * API endpoint that allows us to manually update the server object
 */
router.get('/updateServers', function(req, res, next) {
    
    awsService.updateRunningServers(next);
    // Pass the data to the view
    vm = {
        status: 'ok'
    };

    return res.json(vm);
});

/**
 * Launch a server with a specific commit
 */
router.post('/launch', function(req, res, next) {

    // verify commit param is legit to prevent security breaches on server
    if(/^([a-fA-F0-9]{41})$/.test(req.body.commit)){
        throw new Error('Not a valid git sha1 hash.');
    }
    
    var launchAMI = awsService.launchAMI(
        config.deploymentRepo.owner, // TODO: make owner dynamic, for now hardcoded
        config.deploymentRepo.repo, // TODO: make repo dynamic
        req.body.commit,
        htmlencode.htmlEncode(req.body.instanceName), // HTML Encode the Instance Name for Safety
        false, // This is not a dry run 
        next);
    
    launchAMI.then(function(data){
        awsService.updateRunningServers(next);
         res.redirect("/");
    }).catch(function(err){
        return next(err);
    });

});

/**
* List the commits for a given username and repo
*/
router.get('/commits/:username/:repo', function(req, res, next){
    var getCommits = githubService.getCommits(
        req.params.username, 
        req.params.repo,
        next);

    getCommits.then(function(data){
        var commits = [];

        data.forEach(function(commit){
            commits.push({
                sha: commit.sha,
                login: commit.committer.login,
                avatar_url: commit.committer.avatar_url,
                name: commit.commit.committer.name,
                date: commit.commit.committer.date,
                message: commit.commit.message
            });
        });

        return res.json(commits);
    });
});


module.exports = router;