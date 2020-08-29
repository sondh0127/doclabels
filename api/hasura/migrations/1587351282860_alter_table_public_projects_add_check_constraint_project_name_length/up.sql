alter table "public"."projects" add constraint "project_name_length" check (char_length(name) <= 50);
