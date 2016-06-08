var sql = require('../sql').commits; // Store the complicated SQL externally

// Commit database interface
// Fields:
// sha, message, commit_author, author_name, avatar_url, repository, owner, created

module.exports = rep => {

    return {

        // Creates the table
        create: () => rep.none(sql.create),

        // Returns all commits
        all: () => rep.any('SELECT * FROM commits ORDER BY commit_date DESC'),

        // Tries to find a commit from sha;
        find: id => rep.oneOrNone('SELECT * FROM commits WHERE sha = $1', id),

        // Returns commits per repository
        findByOwnerAndRepo: values => rep.any(
            'SELECT * FROM commits WHERE owner = ${owner} AND repository = ${repository} ORDER BY commit_date DESC',
            values),

        // Insert if not already present
        insert: values => rep.none(sql.insert,values)
    };
};
