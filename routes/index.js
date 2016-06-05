var express = require('express');
var router = express.Router();
var db = require('../db').db;
var aws = require('../services/aws-service');

/* GET home page. */
router.get('/', function(req, res, next) {

    db.servers.all().then(function (data) {

        var vm = {
            servers: data,
            title: 'Home',
            error: req.flash('error'),
            name: 'Hey You'
          }

        res.render('index', vm);
    })
    .catch(function (err) {
        return next(err);
    });

});


module.exports = router;
