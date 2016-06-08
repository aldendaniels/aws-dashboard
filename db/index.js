var config = require('../config.js');
var promise = require('bluebird');

var models = {
    servers: require('./models/servers'),
    commits: require('./models/commits'),
    users: require('./models/users'),
    tokens: require('./models/tokens')
};

var options = {
    promiseLib: promise,
    extend: obj => {
        // We don't not use 'require()' here, because this event occurs for every task
        // and transaction being executed, which should be as fast as possible.
        obj.servers = models.servers(obj);
        obj.commits = models.commits(obj);
        obj.users = models.users(obj);
        obj.tokens = models.tokens(obj);
    }
};

var pgp = require("pg-promise")(options);

var cn = {
    host: config.postgres.hostname,
    port: config.postgres.port,
    database: config.postgres.database,
    user: config.postgres.username,
    password: config.postgres.password
};

var db = pgp(cn);

module.exports = {
    pgp, db
};
