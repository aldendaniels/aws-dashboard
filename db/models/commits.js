var sql = require('../sql').commits; // Store the complicated SQL externally

module.exports = rep => {

    return {

        // Creates the table
        create: () => rep.none(sql.create),

        // Returns all commits
        all: () => rep.any('SELECT * FROM commits ORDER BY created ASC'),

        // Tries to find a commit from sha;
        find: id => rep.oneOrNone('SELECT * FROM commits WHERE sha = $1', id),

        // Returns commits per repository
        findByRepository: repo => rep.any('SELECT * FROM commits WHERE repository = $1', repo),

        // Insert if not already present
        insert: values => rep.one(sql.insert,values)
    };
};
