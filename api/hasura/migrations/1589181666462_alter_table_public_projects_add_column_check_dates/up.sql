ALTER TABLE "public"."projects" ADD COLUMN "check_dates" jsonb NULL DEFAULT jsonb_build_array();
