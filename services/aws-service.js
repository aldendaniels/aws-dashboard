var config = require('../config.js');
var AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
var ec2 = new AWS.EC2({region: config.aws.EC2Region});

var db = require('../db').db;

/**
 * Launches a new AMI from AWS EC2
 *
 * @method     launchAMI
 * @param      {username}   github username where repo lives
 * @param      {repo}       repository
 * @param      {gitCommit}  sha1 hash of the git commit we want to check out
 * @return     {Promise}    return the promise object of the launch command
 */
exports.launchAMI = function(username, repo, commit, next) {

    var commands = new Buffer(`#!/bin/bash
        echo -e "https://github.com/${username}/${repo}.git" > repo
        echo -e "${commit}" > commitcheck
        cd /var/www/
        rm -rf * .git*
        git clone https://github.com/${username}/${repo}.git .
        git checkout ${commit}
        npm install
        node app.js`).toString('base64');

    var imageParams = {
        ImageId: 'ami-83f50cee', // Custom image created as baseline
        InstanceType: config.aws.instanceSize,
        MinCount: 1, 
        MaxCount: 1,
        SecurityGroupIds: ['sg-e9179892'],
        Monitoring: { Enabled: false },
        SubnetId: 'subnet-f4078ade',
        UserData: commands
    };


    // Create the instance
    var runInstances = ec2.runInstances(imageParams).promise();

    // Run an instance and tag it once it is available
    runInstances.then(function(data) {
        
        return ec2.createTags({
            Resources: [data.Instances[0].InstanceId], Tags: [
                {Key: 'Name', Value: 'instanceName'}
        ]});

    }).then(function(data){
        console.log("Tagging instance success");
    }).catch(function(err){
        return next(err);
    });

    return runInstances
};

/**
 * Fetches current running servers, stats, and saves to database
 *
 * @method     updateRunningServers
 * @return     none
 */
exports.updateRunningServers = function(next) {

    // The describeInstanceStatus returns the current status of all ec2 instances
    // in the current region (Note the config.awsEC2Region) running or not.
    // This is a promise.
    var runningServers = ec2.describeInstanceStatus({IncludeAllInstances:true}).promise();

    // Chain the promises to get the full instance data because the describeInstances
    // api method doesn't return stopped servers
    runningServers.then(function(data) {
        var instanceIds = data.InstanceStatuses.map(function(a) {return a.InstanceId;});
        return ec2.describeInstances({InstanceIds:instanceIds}).promise();
    }).then(function(data){

        data.Reservations.forEach(function(reservation){
            reservation.Instances.forEach(function(instance){
                
                db.servers.upsert({
                    instance_id: instance.InstanceId,
                    availability_zone: instance.Placement.AvailabilityZone,
                    state: instance.State.Name,
                    public_ip: instance.PublicDnsName,
                    public_url: instance.PublicDnsName,
                    launch_time: instance.LaunchTime,
                    state_transition: instance.StateTransitionReason
                }).then(function (data) {
                    // No data is returned from the upsert
                }).catch(function (err) {
                    // If we are calling from the cron side we just need to log errors
                    console.log(err);

                });
            })
        })
       
    }).catch(function(err){
        console.log(err);
    });
           

    // Return the promise
    return runningServers;
};
