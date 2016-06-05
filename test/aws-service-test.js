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
    // TODO: set up test to only perform the AWS action once
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
});