CREATE TABLE commits (
    sha text NOT NULL,
    message text,
    commit_author text,
    author_name text,
    avatar_url text,
    repository text,
    owner text,
    created text
);

ALTER TABLE ONLY commits
    ADD CONSTRAINT commits_pkey PRIMARY KEY (sha);