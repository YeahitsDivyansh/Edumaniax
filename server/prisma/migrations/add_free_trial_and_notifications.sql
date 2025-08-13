-- Create FreeTrialRequest table
CREATE TABLE "FreeTrialRequest" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "followUpDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    CONSTRAINT "FreeTrialRequest_pkey" PRIMARY KEY ("id")
);

-- Create NotificationType enum
CREATE TYPE "NotificationType" AS ENUM ('FREE_TRIAL', 'INSTITUTIONAL_INQUIRY', 'PAYMENT', 'GENERAL');

-- Add new columns to SalesNotification table
ALTER TABLE "SalesNotification" ADD COLUMN "type" "NotificationType" NOT NULL DEFAULT 'INSTITUTIONAL_INQUIRY';
ALTER TABLE "SalesNotification" ADD COLUMN "trialId" TEXT;

-- Update existing notifications to have the correct type based on existing data
-- If inquiryId exists, set type to INSTITUTIONAL_INQUIRY
UPDATE "SalesNotification" 
SET "type" = 'INSTITUTIONAL_INQUIRY' 
WHERE "inquiryId" IS NOT NULL;

-- If no inquiryId but has data that looks like institutional inquiry, set type to INSTITUTIONAL_INQUIRY
UPDATE "SalesNotification" 
SET "type" = 'INSTITUTIONAL_INQUIRY' 
WHERE "inquiryId" IS NULL AND "data" LIKE '%organizationName%';

-- Data Recovery: Ensure all existing institutional inquiries have proper notifications
-- This will create notifications for any inquiries that might have been missed
INSERT INTO "SalesNotification" ("id", "type", "message", "data", "status", "inquiryId", "createdAt")
SELECT 
    gen_random_uuid()::text,
    'INSTITUTIONAL_INQUIRY',
    'Existing inquiry from ' || "contactName" || ' at ' || "organizationName",
    json_build_object(
        'inquiryId', "id",
        'contactName', "contactName",
        'contactEmail', "contactEmail",
        'contactPhone', "contactPhone",
        'organizationName', "organizationName",
        'organizationType', "organizationType",
        'studentCount', "studentCount",
        'message', "message"
    )::text,
    'READ',
    "id",
    "createdAt"
FROM "InstitutionalInquiry" i
WHERE NOT EXISTS (
    SELECT 1 FROM "SalesNotification" n WHERE n."inquiryId" = i."id"
);

-- Add foreign key constraint
ALTER TABLE "SalesNotification" ADD CONSTRAINT "SalesNotification_trialId_fkey" FOREIGN KEY ("trialId") REFERENCES "FreeTrialRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Create indexes for better performance
CREATE INDEX "FreeTrialRequest_status_idx" ON "FreeTrialRequest"("status");
CREATE INDEX "FreeTrialRequest_createdAt_idx" ON "FreeTrialRequest"("createdAt");
CREATE INDEX "SalesNotification_type_idx" ON "SalesNotification"("type");
CREATE INDEX "SalesNotification_trialId_idx" ON "SalesNotification"("trialId");

-- ROLLBACK SECTION (for safety - uncomment if you need to revert)
/*
-- To rollback, uncomment these lines:
-- DROP INDEX IF EXISTS "SalesNotification_trialId_idx";
-- DROP INDEX IF EXISTS "SalesNotification_type_idx";
-- DROP INDEX IF EXISTS "FreeTrialRequest_createdAt_idx";
-- DROP INDEX IF EXISTS "FreeTrialRequest_status_idx";
-- ALTER TABLE "SalesNotification" DROP CONSTRAINT IF EXISTS "SalesNotification_trialId_fkey";
-- ALTER TABLE "SalesNotification" DROP COLUMN IF EXISTS "trialId";
-- ALTER TABLE "SalesNotification" DROP COLUMN IF EXISTS "type";
-- DROP TYPE IF EXISTS "NotificationType";
-- DROP TABLE IF EXISTS "FreeTrialRequest";
*/
