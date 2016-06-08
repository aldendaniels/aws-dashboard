CREATE TABLE "public"."tokens" (
    "id" serial,
    "token_string" text,
    "email" text,
    "claimed" timestamp with time zone,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("email") REFERENCES "public"."users"("email")
);
