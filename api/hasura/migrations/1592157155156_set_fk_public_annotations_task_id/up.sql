alter table "public"."annotations"
           add constraint "annotations_task_id_fkey"
           foreign key ("task_id")
           references "public"."task_distribution"
           ("id") on update restrict on delete restrict;
