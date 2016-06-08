var sql = require('../sql').tokens;

// User database interface
// Fields: name, email, password

module.exports = rep => {

    return {

        // Creates the table
        create: () => rep.none(sql.create),

        // Insert or update a record
        insert: values => rep.none('INSERT INTO tokens(token, email) ' +
          'VALUES(${token}, ${email})',values),

        // Tries to find a server from instance id;
        find: email => rep.oneOrNone('SELECT * FROM tokens WHERE email = $1', email),

        // Claim
        claim: values => rep.oneOrNone('UPDATE tokens SET claimed = NOW() ' + 
          'WHERE email = ${email} AND token = ${token} RETURNING email',values)

    };
};