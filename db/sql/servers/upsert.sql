INSERT INTO ec2_servers AS ec2 (
  instance_id,
  availability_zone,
  state,
  public_ip,
  public_url,
  launch_time,
  state_transition,
  last_updated,
  deleted
  )
VALUES (${instance_id},
        ${availability_zone},
        ${state},
        ${public_ip},
        ${public_url},
        ${launch_time},
        ${state_transition},
        NOW(),
        false) 
ON conflict (instance_id) DO
UPDATE
SET (availability_zone,
     state,
     public_ip,
     public_url,
     launch_time,
     state_transition,
     last_updated,
     deleted) = (${availability_zone},
                      ${state},
                      ${public_ip},
                      ${public_url},
                      ${launch_time},
                      ${state_transition},
                      NOW(),
                      false)
WHERE ec2.instance_id = ${instance_id}