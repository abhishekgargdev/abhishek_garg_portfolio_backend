-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "abhishek_portfolio";

-- CreateTable
CREATE TABLE "abhishek_portfolio"."users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash_password" TEXT NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "reset_token" TEXT,
    "reset_token_expiry" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "abhishek_portfolio"."redis_connections" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "details" JSONB,
    "last_checked_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "redis_connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "abhishek_portfolio"."users"("email");
