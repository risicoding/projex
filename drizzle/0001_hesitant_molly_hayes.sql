CREATE TABLE "boardItem" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"projectId" integer,
	"columnId" integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "boardColumn" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "boardColumn" CASCADE;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "boardItem" ADD CONSTRAINT "boardItem_projectId_user_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;