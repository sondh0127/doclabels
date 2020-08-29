alter table "public"."task_distribution" drop constraint "task_distribution_document_id_fkey",
             add constraint "task_distribution_document_id_fkey"
             foreign key ("document_id")
             references "public"."documents"
             ("id") on update restrict on delete cascade;
