/*
 * API Route
 * The collection functions handling the api calls
 */

var express = require('express');
var _ = require('underscore');
var awsService = require('../services/aws-service');

// Load the express router
var router = express.Router();

/**
 * Load the Kmeans API Data
 */
router.get('/updateServers', function(req, res, next) {
    
    awsService.getRunningServers()
    // Pass the data to the view
    vm = {
        servers: ['thisOne','thatOne']
    }

    return res.json(vm);
});

module.exports = router;