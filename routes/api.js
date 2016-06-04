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
router.get('/load/:sample/:clusters', function(req, res, next) {

  // Pass the data to the view
  vm = {
    servers: awsService.getRunningServers('someId')
  }

  return res.json(vm);
});

module.exports = router;