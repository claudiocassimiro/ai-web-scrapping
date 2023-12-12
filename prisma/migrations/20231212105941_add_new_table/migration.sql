-- CreateTable
CREATE TABLE "ScheduledReports" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "scheduledTopicId" TEXT NOT NULL,
    "vector" vector,

    CONSTRAINT "ScheduledReports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScheduledReports" ADD CONSTRAINT "ScheduledReports_scheduledTopicId_fkey" FOREIGN KEY ("scheduledTopicId") REFERENCES "ScheduledTopics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
