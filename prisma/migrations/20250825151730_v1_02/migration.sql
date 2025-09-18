/*
  Warnings:

  - The `gender` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT;

-- DropEnum
DROP TYPE "public"."Gender";

-- CreateTable
CREATE TABLE "public"."Gender" (
    "id" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_gender_idx" ON "public"."users"("gender");
