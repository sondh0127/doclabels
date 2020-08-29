alter table "public"."task_distribution" add foreign key ("user_id") references "public"."users"("id") on update restrict on delete restrict;
