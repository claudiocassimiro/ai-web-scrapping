-- CreateTable
CREATE TABLE "ScheduledTopics" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "tags" TEXT,
    "tagsToAvoid" TEXT,
    "typeOfReport" TEXT,
    "email" TEXT,

    CONSTRAINT "ScheduledTopics_pkey" PRIMARY KEY ("id")
);
