INSERT INTO commits AS c (sha, message, commit_author, author_name, avatar_url, repository, owner, created) 
SELECT ${sha},
        ${message},
        ${commit_author},
        ${author_name},
        ${avatar_url},
        ${repository},
        ${owner},
        NOW()
WHERE NOT EXISTS (SELECT sha from commits WHERE sha = ${sha})
RETURNING sha, message, commit_author, author_name, avatar_url, repository, owner, created;