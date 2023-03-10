import { createTRPCRouter } from "./trpc";
import { post } from "./routers/post";
import { user } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  post,
  user
});

// export type definition of API
export type AppRouter = typeof appRouter;
