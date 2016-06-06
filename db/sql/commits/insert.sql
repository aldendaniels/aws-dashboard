INSERT INTO commits AS c (sha, message, login, name, avatar_url, repository, username, created) 
SELECT ${sha},
        ${message},
        ${login},
        ${name},
        ${avatar_url},
        ${repository},
        ${username},
        NOW()
WHERE NOT EXISTS (SELECT sha from commits WHERE sha = ${sha})
RETURNING sha, message, login, name, avatar_url, repository, username, created;