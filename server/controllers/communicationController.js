import prisma from "../utils/prisma.js";

export const markChallengeComplete = async (req, res) => {
  const { userClass , moduleIndex, challengeIndex } = req.body;
  const userId = req.user.id;

   if (!userClass || moduleIndex === undefined || challengeIndex === undefined) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }
  
  try {
    const progress = await prisma.communicationChallenge.upsert({
      where: {
         userId_userClass_moduleIndex_challengeIndex: {
          userId,
          userClass,
          moduleIndex,
          challengeIndex,
        },
      },
      update: {
        completed: true,
        completedAt: new Date(),
      },
      create: {
        userId,
        userClass,
        moduleIndex,
        challengeIndex,
        completed: true,
        completedAt: new Date(),
      },
    });

    res.json({ success: true, progress });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Failed to update progress" });
  }
};
 
export const getUserProgress = async (req, res) => {
  const userId = req.user.id;

  try {
    const progress = await prisma.communicationChallenge.findMany({
      where: { userId, completed: true },
    });

    res.json({ success: true, progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch progress" });
  }
};
