-- CreateTable
CREATE TABLE "redis_connections" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "details" JSONB,
    "last_checked_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "redis_connections_pkey" PRIMARY KEY ("id")
);
