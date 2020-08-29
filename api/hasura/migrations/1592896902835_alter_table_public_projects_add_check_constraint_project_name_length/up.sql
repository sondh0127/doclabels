alter table "public"."projects" drop constraint "project_name_length";
alter table "public"."projects" add constraint "project_name_length" check (char_length(name) < 50);
