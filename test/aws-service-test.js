var config = require('../config');
var chai = require('chai');
var assert = chai.assert;

var aws = require('../services/aws-service');
var db = require('../db').db;

describe('AWS', function() {

    // Test if configuration values are present
    describe('Configuration', function() {
        it('Region config should exist', function() {
            assert.isNotNull(config.aws.EC2Region);
        });
    });

    // Check to see that there is some connectivity to AWS
    describe('Connectivity',function() {
        it('Gets instance statuses back', function() {
            return aws.updateRunningServers(null)
                .then(function(data) {
                    assert(data != null, "AWS should respond");
                });
        });
    });

    // Test if the same number of rows exist in the database as the AWS call
    describe('EC2 Database Update',function() {
        it('Has the same number of instances as database rows', function() {
            return aws.updateRunningServers(null)
                .then(function(awsResponse) {
                    // Nested promises, not ideal, but workable
                    db.servers.all().then(function (data) {
                        assert.equal(awsResponse.InstanceStatuses.length,data.length,
                            'Different number of db rows and response');
                    });
                });
        });
    });

    // Test if we are able to create a dry run of the Launch AMI function
    describe('Launch AMI Dry Run Test',function() {
        it('Returns a value indicating the action would work', function() {

            // Set up some sane testing parameters
             var launchAMI = aws.launchAMI(
                'treyreynolds', 
                'node-helloworld', 
                '93f56218ecd3d747310e02e1070e74b11f36039d',
                'Test Instance',
                true, // This is dry run
                null);

            return launchAMI.then(assert.fail)
                .catch(function(e) {
                    assert.equal(e.message, "Request would have succeeded, but DryRun flag is set.");
                });
        });
    });

});