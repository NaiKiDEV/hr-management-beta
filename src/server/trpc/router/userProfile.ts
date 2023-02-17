import { router, protectedProcedure } from "../trpc";

const mapUserToProfile = protectedProcedure.mutation(async ({ ctx }) => {
  const userId = ctx.session.user.id;

  const user = await ctx.prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user?.email) {
    return { error: "You must have an email to use this application." };
  }

  const userProfile = await ctx.prisma.userProfile.findFirst({
    where: { email: user.email },
  });

  if (!userProfile) {
    return { error: "You are not allowed to access this application." };
  }

  if (!userProfile.userId) {
    await ctx.prisma.userProfile.update({
      where: {
        email: user.email,
      },
      data: {
        userId,
      },
    });
  }

  return { success: true };
});

const getCurrentUserProfile = protectedProcedure.query(async ({ ctx }) => {
  const userId = ctx.session.user.id;

  const userProfile = await ctx.prisma.userProfile.findFirst({
    where: { userId },
  });

  if (!userProfile) {
    return { error: "You don't have a profile assigned to your account." };
  }

  return userProfile;
});

export const userProfileRouter = router({
  mapUserToProfile,
  getCurrentUserProfile,
});
