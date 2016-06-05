var config = require('../config.js');
var logger = require('morgan');
var AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
var ec2 = new AWS.EC2({region: config.aws.EC2Region});

var db = require('../db').db;

/**
 * Launches a new AMI from AWS EC2
 *
 * @method     launchAMI
 * @param      {number}  sampleSize population size
 * @return     {Array}   launch command status
 */
exports.launchAMI = function(gitCommit) {

  var params = {
    ImageId: 'ami-1624987f', // Amazon Linux AMI x86_64 EBS
    InstanceType: 't1.micro',
    MinCount: 1, MaxCount: 1
  };

  // Create the instance
  ec2.runInstances(params, function(err, data) {
    if (err) { console.log("Could not create instance", err); return; }

    var instanceId = data.Instances[0].InstanceId;
    console.log("Created instance", instanceId);

    // Add tags to the instance
    params = {Resources: [instanceId], Tags: [
      {Key: 'Name', Value: 'instanceName'}
    ]};
    ec2.createTags(params, function(err) {
      console.log("Tagging instance", err ? "failure" : "success");
    });
  });

  return launchStatus;
};

/**
 * Fetches current running servers, stats, and saves to Database
 *
 * @method     updateRunningServers
 * @return     none
 */
exports.updateRunningServers = function() {

    // The describeInstanceStatus returns the current status of all ec2 instances
    // in the current region (Note the config.awsEC2Region) running or not.
    ec2.describeInstanceStatus({IncludeAllInstances:true},function(err, data) {
        if (err) {
          // We were unable to call the AWS API, log and move on
          console.log(err);

        } else {

          data.InstanceStatuses.forEach(function (status) {

            db.servers.upsert({
                instance_id: status.InstanceId,
                availability_zone: status.AvailabilityZone,
                status: status.InstanceStatus.Status,
                state: status.InstanceState.Name,
                system_status: status.SystemStatus.Status
            }).then(function (data) {
                console.log(data);
            })
            .catch(function (error) {
                console.log(error);
            });

          });
        }
  });
};
