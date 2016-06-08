INSERT INTO ec2_servers AS ec2 (
  instance_id,
  name,
  availability_zone,
  state,
  public_ip,
  public_url,
  launch_time,
  state_transition,
  commit_hash,
  last_updated,
  deleted
  )
VALUES (${instance_id},
        ${name},
        ${availability_zone},
        ${state},
        ${public_ip},
        ${public_url},
        ${launch_time},
        ${state_transition},
        ${commit_hash},
        NOW(),
        FALSE) 
ON conflict (instance_id) DO
UPDATE
SET (name,
     availability_zone,
     state,
     public_ip,
     public_url,
     launch_time,
     state_transition,
     last_updated,
     deleted) = (${name},
                      ${availability_zone},
                      ${state},
                      ${public_ip},
                      ${public_url},
                      ${launch_time},
                      ${state_transition},
                      NOW(),
                      FALSE)
WHERE ec2.instance_id = ${instance_id}