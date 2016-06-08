INSERT INTO commits AS c (sha, message, commit_author, author_name, avatar_url, repository, owner, commit_date) 
SELECT ${sha},
        ${message},
        ${commit_author},
        ${author_name},
        ${avatar_url},
        ${repository},
        ${owner},
        ${commit_date}
WHERE NOT EXISTS (SELECT sha from commits WHERE sha = ${sha});