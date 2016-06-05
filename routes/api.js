/*
 * API Route
 * The collection functions handling the api calls
 */

var express = require('express');
var _ = require('underscore');
var awsService = require('../services/aws-service');
var githubService = require('../services/github-service');

// Load the express router
var router = express.Router();

/**
 * Load the Kmeans API Data
 */
router.get('/updateServers', function(req, res, next) {
    
    awsService.updateRunningServers(next);
    // Pass the data to the view
    vm = {
        status: 'ok'
    };

    return res.json(vm);
});

router.get('/commits/:username/:repo', function(req, res, next){
    var repos = githubService.getCommits(
        req.params.username, 
        req.params.repo,
        next);

    vm = {
        repos: repos
    };

    return res.json(vm);
});

module.exports = router;