var config = require('../config');
var chai = require('chai');
var assert = chai.assert;

var gh = require('../services/github-service');
var db = require('../db').db;

describe('Github Service', function() {

    // Test if configuration values are present
    describe('Configuration', function() {
        it('Username exists and is not default value', function() {
            assert.isNotNull(config.github.username);
            assert.notEqual(config.github.username,'[USERNAME]');
        });

        it('Password should exist in config', function() {
            assert.isNotNull(config.github.password);
            assert.notEqual(config.github.password,'[PASSWORD]');
        });

    });

    // Test if the same number of rows exist in the database as the AWS call
    describe('Get some commits',function() {
        it('A known repo returns some commits', function() {
            return gh.getCommits('treyreynolds', 'node-helloworld', null) 
                .then(function(commits) {
                    // Nested promises, not ideal, but workable
                    assert(commits.length > 0, "A known repo has commits");
                });
        });
    });

});