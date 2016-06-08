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
}

module.exports = {
    servers: {
        create: sql('servers/create_table.sql'),
        upsert: sql('servers/upsert.sql')
    },
    commits: {
        create: sql('commits/create_table.sql'),
        insert: sql('commits/insert.sql')
    },
    users: {
        create: sql('users/create_table.sql'),
        insert: sql('users/insert.sql')
    },
    tokens: {
        create: sql('tokens/create_table.sql'),
        insert: sql('tokens/insert.sql')
    }
};
