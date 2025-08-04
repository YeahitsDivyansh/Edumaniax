-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "userClass" TEXT NOT NULL,
    "characterGender" TEXT NOT NULL,
    "characterName" TEXT NOT NULL,
    "characterStyle" TEXT NOT NULL,
    "characterTraits" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtpVerification" (
    "phonenumber" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "otpExpiration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtpVerification_pkey" PRIMARY KEY ("phonenumber")
);

-- CreateTable
CREATE TABLE "FinanceChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userClass" TEXT NOT NULL,
    "moduleIndex" INTEGER NOT NULL,
    "challengeIndex" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "FinanceChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DMChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userClass" TEXT NOT NULL,
    "moduleIndex" INTEGER NOT NULL,
    "challengeIndex" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "DMChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunicationChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userClass" TEXT NOT NULL,
    "moduleIndex" INTEGER NOT NULL,
    "challengeIndex" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "CommunicationChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComputersChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userClass" TEXT NOT NULL,
    "moduleIndex" INTEGER NOT NULL,
    "challengeIndex" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "ComputersChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntrepreneurshipChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userClass" TEXT NOT NULL,
    "moduleIndex" INTEGER NOT NULL,
    "challengeIndex" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "EntrepreneurshipChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnvironmentChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userClass" TEXT NOT NULL,
    "moduleIndex" INTEGER NOT NULL,
    "challengeIndex" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "EnvironmentChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LawChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userClass" TEXT NOT NULL,
    "moduleIndex" INTEGER NOT NULL,
    "challengeIndex" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "LawChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadershipChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userClass" TEXT NOT NULL,
    "moduleIndex" INTEGER NOT NULL,
    "challengeIndex" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "LeadershipChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SELChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userClass" TEXT NOT NULL,
    "moduleIndex" INTEGER NOT NULL,
    "challengeIndex" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "SELChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModulePerformance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "totalGamesPlayed" INTEGER NOT NULL,
    "completedGamesCount" INTEGER NOT NULL,
    "averageScorePerGame" DOUBLE PRECISION NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "avgResponseTimeSec" DOUBLE PRECISION NOT NULL,
    "studyTimeMinutes" INTEGER NOT NULL,
    "daysActiveCount" INTEGER NOT NULL,
    "lastActiveDate" TIMESTAMP(3),
    "lastGamePlayedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModulePerformance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicPerformance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "topicName" TEXT NOT NULL,
    "averageScorePerGame" DOUBLE PRECISION NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedGamesCount" INTEGER NOT NULL,

    CONSTRAINT "TopicPerformance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readTime" TEXT,
    "tableOfContents" JSONB NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phonenumber_key" ON "User"("phonenumber");

-- CreateIndex
CREATE UNIQUE INDEX "FinanceChallenge_userId_userClass_moduleIndex_challengeIndex_key" ON "FinanceChallenge"("userId", "userClass", "moduleIndex", "challengeIndex");

-- CreateIndex
CREATE UNIQUE INDEX "DMChallenge_userId_userClass_moduleIndex_challengeIndex_key" ON "DMChallenge"("userId", "userClass", "moduleIndex", "challengeIndex");

-- CreateIndex
CREATE UNIQUE INDEX "CommunicationChallenge_userId_userClass_moduleIndex_challengeIndex_key" ON "CommunicationChallenge"("userId", "userClass", "moduleIndex", "challengeIndex");

-- CreateIndex
CREATE UNIQUE INDEX "ComputersChallenge_userId_userClass_moduleIndex_challengeIndex_key" ON "ComputersChallenge"("userId", "userClass", "moduleIndex", "challengeIndex");

-- CreateIndex
CREATE UNIQUE INDEX "EntrepreneurshipChallenge_userId_userClass_moduleIndex_challengeIndex_key" ON "EntrepreneurshipChallenge"("userId", "userClass", "moduleIndex", "challengeIndex");

-- CreateIndex
CREATE UNIQUE INDEX "EnvironmentChallenge_userId_userClass_moduleIndex_challengeIndex_key" ON "EnvironmentChallenge"("userId", "userClass", "moduleIndex", "challengeIndex");

-- CreateIndex
CREATE UNIQUE INDEX "LawChallenge_userId_userClass_moduleIndex_challengeIndex_key" ON "LawChallenge"("userId", "userClass", "moduleIndex", "challengeIndex");

-- CreateIndex
CREATE UNIQUE INDEX "LeadershipChallenge_userId_userClass_moduleIndex_challengeIndex_key" ON "LeadershipChallenge"("userId", "userClass", "moduleIndex", "challengeIndex");

-- CreateIndex
CREATE UNIQUE INDEX "SELChallenge_userId_userClass_moduleIndex_challengeIndex_key" ON "SELChallenge"("userId", "userClass", "moduleIndex", "challengeIndex");

-- CreateIndex
CREATE UNIQUE INDEX "ModulePerformance_userId_moduleName_key" ON "ModulePerformance"("userId", "moduleName");

-- CreateIndex
CREATE UNIQUE INDEX "TopicPerformance_userId_moduleName_topicName_key" ON "TopicPerformance"("userId", "moduleName", "topicName");

-- AddForeignKey
ALTER TABLE "FinanceChallenge" ADD CONSTRAINT "FinanceChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DMChallenge" ADD CONSTRAINT "DMChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationChallenge" ADD CONSTRAINT "CommunicationChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComputersChallenge" ADD CONSTRAINT "ComputersChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntrepreneurshipChallenge" ADD CONSTRAINT "EntrepreneurshipChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnvironmentChallenge" ADD CONSTRAINT "EnvironmentChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LawChallenge" ADD CONSTRAINT "LawChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadershipChallenge" ADD CONSTRAINT "LeadershipChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SELChallenge" ADD CONSTRAINT "SELChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModulePerformance" ADD CONSTRAINT "ModulePerformance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicPerformance" ADD CONSTRAINT "TopicPerformance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
