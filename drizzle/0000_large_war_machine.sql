CREATE TABLE "boardColumn" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"projectId" integer
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"orgId" varchar NOT NULL,
	"creatorId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"name" text
);
