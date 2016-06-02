/*
 * Home Route
 * The collection functions handling the two calls on the home page
 */

var express = require('express');
var _ = require('underscore');
var kMeans = require('kmeans-js');
var dataService = require('../services/data-service');

var router = express.Router();


/* GET index page for the k-means clustering algo example. */
router.get('/', function(req, res, next) {

  var vm = {
    title: 'Home',
    name: req.user ? req.user.name : 'test'
  }
  res.render('home/index', vm);
});


module.exports = router;
