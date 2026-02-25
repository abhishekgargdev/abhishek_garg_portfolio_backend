-- CreateTable
CREATE TABLE "abhishek_portfolio"."database_checks" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "details" JSONB,
    "last_checked_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "database_checks_pkey" PRIMARY KEY ("id")
);
