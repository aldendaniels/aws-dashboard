var QueryFile = require('pg-promise').QueryFile;

// Helper for linking to external query files;
function sql(file) {

    var path = __dirname + '/' + file;

    var options = {

        // minifying the SQL is always advised;
        // see also option 'compress' in the API;
        minify: true,

        params: {
            // Showing how to use static pre-formatting parameters -
            // variable 'schema' in each SQL, just as an example;

            schema: 'public' // 'public' is the default schema
        }
    };

    return new QueryFile(path, options);

    // See QueryFile API:
    // http://vitaly-t.github.io/pg-promise/QueryFile.html
}

module.exports = {
    servers: {
        create: sql('servers/create.sql'),
        upsert: sql('servers/upsert.sql')
    },
    commits: {
        create: sql('commits/create.sql'),
        insert: sql('commits/insert.sql')
    },
    users: {
        insert: sql('users/insert.sql')
    }
};
