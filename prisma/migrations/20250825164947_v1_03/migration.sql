-- CreateTable
CREATE TABLE "public"."MaritalStatus" (
    "id" TEXT NOT NULL,
    "marital_status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "MaritalStatus_pkey" PRIMARY KEY ("id")
);
