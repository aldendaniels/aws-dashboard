INSERT INTO ec2_servers AS ec2 (instance_id, availability_zone, status, state, system_status, created, last_updated)
VALUES (${instance_id},
        ${availability_zone},
        ${status},
        ${state},
        ${system_status},
        NOW(),
        NOW()) 
ON conflict (instance_id) DO
UPDATE
SET (availability_zone,
     status,
     STATE,
     system_status,
     last_updated) = (${availability_zone},
                      ${status},
                      ${state},
                      ${system_status},
                      NOW())
WHERE ec2.instance_id = ${instance_id}