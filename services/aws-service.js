var AWS = require('aws-sdk');
var config = require('../config.js');
var logger = require('morgan');
var pg = require('pg');
var ec2 = new AWS.EC2({region: config.aws.EC2Region});

/**
 * Launches a new AMI from AWS EC2
 *
 * @method     launchAMI
 * @param      {number}  sampleSize population size
 * @return     {Array}   launch command status
 */
exports.launchAMI = function(gitCommit) {

  var launchStatus = {
    status: 'ok'
  };

  return launchStatus;
};

/**
 * Fetches current running servers, stats, and saves to Database
 *
 * @method     createData
 * @param      {number}  sampleSize population size
 * @return     {Array}   random data
 */
exports.getRunningServers = function() {

  // The describeInstanceStatus returns the current status of all ec2 instances
  // in the current region (Note the config.awsEC2Region) running or not.
  ec2.describeInstanceStatus({IncludeAllInstances:true},function(err, data) {
    if (err) {
      // We were unable to call the AWS API, log and move on, probably intermittent
      // connectivity problems.
      // TODO: error logging
      console.log(err);
    } else {

      // TODO: Batch updates instead of one connection per update
      data.InstanceStatuses.forEach(function (status) {
        console.log(status);
      
        // TODO: Move this somewhere else
        var connectionString = "pg://" + config.postgres.username + ':' +
          config.postgres.password + '@' +
          config.postgres.hostname + ':' +
          config.postgres.port + "/" +
          config.postgres.database;

        pg.connect(connectionString, function(err, client, done) {
            // The ON CONFLICT construct in Postgres allows us to update or insert
            client.query(`insert into ec2_servers as ec2 
              (instance_id, availability_zone, status, state, system_status, created, last_updated)
                values ($1,$2,$3,$4,$5,NOW(),NOW())
              on conflict (instance_id)
                do update 
                  set (availability_zone, status, state, system_status, created, last_updated) =
                      ($2,$3,$4,$5,NOW(),NOW())
                where ec2.instance_id = $1`,[
                status.InstanceId,
                status.InstanceStatus.Status,
                status.AvailabilityZone,
                status.InstanceState.Name,
                status.SystemStatus.Status
              ], 
            function(err, result) {
              if (err) {
                // Unable to save to the database, log and move forward
                console.log(err);
              }
              done();  // client idles for 30 seconds before closing
            });
        });
      });
    }

  });
};
