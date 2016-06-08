var config = require('../config');
var chai = require('chai');
var assert = chai.assert;
var db = require('../db').db;

describe('Database', function() {

    // Test if configuration values are present
    describe('Configuration', function() {
        it('Username should exist and not be default', function() {
            assert.isNotNull(config.postgres.username);
            assert.notEqual(config.postgres.username,'[USERNAME]');
        });

        it('Password should exist and not be default', function() {
            assert.isNotNull(config.postgres.password);
            assert.notEqual(config.postgres.password,'[PASSWORD]');
        });

        it('Database should exist and not be default', function() {
            assert.isNotNull(config.postgres.database);
            assert.notEqual(config.postgres.database,'[DATABASE]');
        });

        it('Hostname should exist and not be default', function() {
            assert.isNotNull(config.postgres.hostname);
            assert.notEqual(config.postgres.hostname,'[HOSTNAME]');
        });

        it('Port should exist and not be default', function() {
            assert.isNotNull(config.postgres.port);
            assert.notEqual(config.postgres.port,'[PORT]');
        });
    });


    // Check to see that there is some connectivity to AWS
    describe('Connectivity',function() {
        it('Does not error on attempt to get rows', function() {
            return db.servers.all()
                .then(function(data) {
                    assert.isNotNull(data, "Should return at least empty array");
                });
        });
    });
});