var sql = require('../sql').servers; // Store the complicated SQL externally

module.exports = rep => {

    return {

        // Creates the table
        create: () => rep.none(sql.create),

        // Returns all server records
        all: () => rep.any('SELECT * FROM ec2_servers ORDER BY created ASC'),

        // Insert or update a record
        upsert: values => rep.none(sql.upsert,values),

        // Tries to find a product from id;
        find: id => rep.oneOrNone('SELECT * FROM ec2_servers WHERE instance_id = $1', id)

    };
};
