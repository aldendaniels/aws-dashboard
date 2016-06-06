/*
 * API Route
 * The collection of functions handling the api calls
 */

var express = require('express');
var _ = require('underscore');
var awsService = require('../services/aws-service');
var githubService = require('../services/github-service');

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