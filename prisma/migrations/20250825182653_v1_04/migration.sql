-- CreateTable
CREATE TABLE "public"."AgeGroup" (
    "id" TEXT NOT NULL,
    "from_age" INTEGER NOT NULL,
    "to_age" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
 
    CONSTRAINT "AgeGroup_pkey" PRIMARY KEY ("id")
);
