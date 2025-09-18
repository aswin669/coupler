-- CreateTable
CREATE TABLE "public"."AcademicLevel" (
    "id" TEXT NOT NULL,
    "academic_Level" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "AcademicLevel_pkey" PRIMARY KEY ("id")
);
