/**
 * This file contains the root router of your tRPC-backend
 */
import { createRouter } from '../create-router';
// import superjson from 'superjson';
import { listRouter } from './list';
// import { warn } from 'console';

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  // Not sure if this transformer is needed? Messes with the types. Probably only needed on specific queries?
  //  .transformer(superjson)
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })
  /**
   * Add a health check endpoint to be called with `/api/trpc/healthz`
   */
  .query('healthz', {
    async resolve() {
      return 'yay!';
    },
  })
  /**
   * Merge `listRouter` under `list.`
   */
  .merge('list.', listRouter);

export type AppRouter = typeof appRouter;