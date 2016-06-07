CREATE TABLE ec2_servers (
    instance_id text NOT NULL,
    availability_zone text,
    state text,
    public_ip text,
    public_url text,
    launch_time timestamp with time zone,
    state_transition text,
    last_updated date
);

ALTER TABLE ONLY ec2_servers
    ADD CONSTRAINT ec2_servers_pkey PRIMARY KEY (instance_id);