-- AlterTable
ALTER TABLE "media" ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'local',
ADD COLUMN     "public_id" TEXT;
