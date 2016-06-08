var sql = require('../sql').servers; // Store the complicated SQL externally

// Commit database interface
// Fields: instance_id, availability_zone, state, public_ip, public_url, 
// launch_time, state_transition, last_updated

module.exports = rep => {

    return {

        // Creates the table
        create: () => rep.none(sql.create),

        // Returns all server records which are not soft deleted
        all: () => rep.any('SELECT * FROM ec2_servers WHERE deleted = FALSE ORDER BY state, instance_id ASC'),

        // Insert or update a record
        upsert: values => rep.none(sql.upsert,values),

        // Tries to find a server from instance id;
        find: id => rep.oneOrNone('SELECT * FROM ec2_servers WHERE instance_id = $1', id),

        deleteNonActive: instanceIds => rep.none(
            "UPDATE ec2_servers SET deleted = true WHERE instance_id NOT IN ($1:csv)", 
            [instanceIds]),

        runningCount: () => rep.one("SELECT count(*) FROM ec2_servers WHERE state = 'running'")

    };
};
