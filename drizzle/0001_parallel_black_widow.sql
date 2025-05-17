CREATE TABLE "availability" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "availability_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"camp_id" integer NOT NULL,
	"availability" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
