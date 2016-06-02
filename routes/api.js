/*
 * API Route
 * The collection functions handling the api calls
 */

var express = require('express');
var _ = require('underscore');
var kMeans = require('kmeans-js');
var dataService = require('../services/data-service');

// Load the express router
var router = express.Router();

/**
 * Load the Kmeans API Data
 */
router.get('/load/:sample/:clusters', function(req, res, next) {

  // Our data service generates a semi-random set of datapoints
  var data = dataService.createData(req.params.sample);
  
  // The 'K' here refers to the number of clusters
  var km = new kMeans({ K: req.params.clusters });

  // Set up the initial clusters
  km.cluster(data);

  // We are stepping through the K-Means process
  while (km.step()) {
      // Assing points to centroids
      km.findClosestCentroids();
      // Update the centroids to the new average of the points
      km.moveCentroids();
      // If the centroids no longer move, we're done
      if(km.hasConverged()) break;
  }

  // Gather up our clusters for display
  var clusters = [];
  var datapoints = [];
  var popNumber = 1;
  // The cluster format returns the array index of the datapoint
  // instead of the datapoint itself.
  for (cl of km.clusters){
    for(cp of cl){
      datapoints.push(data[cp]);
    }

    // Set up each of the populations by creating a name and getting a unique color
    clusters.push({
      name: 'Population ' + popNumber,
      color: dataService.getColor(popNumber),
      data: datapoints
    });
    datapoints = [];
    popNumber = popNumber + 1;
  }

  // Pass the data to the view
  vm = {
    unclustered: [{
            name: 'Student Data',
            color: 'rgba(26, 143, 32, .7)',
            data: data
        }],
    clustered: clusters,
    iterations: km.currentIteration
  }

  return res.json(vm);
});

module.exports = router;