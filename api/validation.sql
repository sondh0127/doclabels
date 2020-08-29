CREATE OR REPLACE FUNCTION check_contributor_request() RETURNS trigger
    LANGUAGE 'plpgsql';
    AS $$
BEGIN
  IF EXISTS(SELECT * FROM project_notifications n WHERE (n.sender_id = NEW.sender_id AND n.notification_type = 'contributor_request' AND n.target_id = NEW.target_id AND is_read = FALSE) )
  THEN
    raise exception 'Request is exists';
  END IF;
  RETURN NEW;
END;
$$


CREATE TRIGGER check_insert_notifications_one
  BEFORE INSERT
  ON "project_notifications"
  FOR EACH ROW
  EXECUTE PROCEDURE check_contributor_request();