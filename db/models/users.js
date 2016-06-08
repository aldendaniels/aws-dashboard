// User database interface
// Fields: name, email, password

module.exports = rep => {

    return {

        // Creates the table
        create: () => rep.none(sql.create),

        // Insert or update a record
        insert: values => rep.none('INSERT INTO users(email, name, password) VALUES(${email}, ${name}, ${password})',values),

        // Tries to find a server from instance id;
        find: email => rep.oneOrNone('SELECT * FROM users WHERE email = $1', email)

    };
};
