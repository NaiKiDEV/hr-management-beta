import { router } from "../trpc";
import { authRouter } from "./auth";
import { userProfileRouter } from "./userProfile";

export const appRouter = router({
  auth: authRouter,
  userProfile: userProfileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
