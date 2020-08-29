ALTER TABLE "public"."annotations" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();
