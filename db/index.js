var config = require('../config.js');
var promise = require('bluebird');

var models = {
    servers: require('./models/servers')
};

var options = {
    promiseLib: promise,
    extend: obj => {
        // Do not use 'require()' here, because this event occurs for every task
        // and transaction being executed, which should be as fast as possible.
        obj.servers = models.servers(obj);
    }
};

var pgp = require("pg-promise")(options);

var cn = {
    host: config.postgres.hostname, // server name or IP address;
    port: config.postgres.port,
    database: config.postgres.database,
    user: config.postgres.username,
    password: config.postgres.password
};

var db = pgp(cn);

module.exports = {
    pgp, db
};
