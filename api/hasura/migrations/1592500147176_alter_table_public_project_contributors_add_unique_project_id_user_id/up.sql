alter table "public"."project_contributors" add constraint "project_contributors_project_id_user_id_key" unique ("project_id", "user_id");
