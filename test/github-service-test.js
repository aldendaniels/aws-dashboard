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

});