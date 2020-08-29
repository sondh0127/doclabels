alter table "public"."task_distribution" drop constraint "task_distribution_user_id_fkey",
             add constraint "task_distribution_user_id_fkey"
             foreign key ("user_id")
             references "public"."users"
             ("id") on update restrict on delete cascade;
