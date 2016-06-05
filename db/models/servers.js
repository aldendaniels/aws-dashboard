var sql = require('../sql').servers; // Store the complicated SQL externally

module.exports = rep => {

    return {

        // Creates the table
        create: () => rep.none(sql.create),

        // Returns all server records
        all: () => rep.any('SELECT * FROM ec2_servers'),

        // Insert or update a record
        upsert: values => rep.one(sql.upsert,values)

        // Tries to find a product from id;
        //find: id => rep.oneOrNone('SELECT * FROM Products WHERE id = $1', id),

        

        // Returns the total number of products;
        //total: () => rep.one('SELECT count(*) FROM Products')
        //    .then(data => parseInt(data.count))

    };
};
