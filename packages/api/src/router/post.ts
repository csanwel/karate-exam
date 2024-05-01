import { CreatePostSchema } from "@csanwel/validators";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(() => {
    return [];
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    // return ctx.db.query.post.findMany({
    //   orderBy: desc(schema.post.id),
    //   limit: 10,
    // });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return input;
    }),

  create: protectedProcedure.input(CreatePostSchema).mutation(({ input }) => {
    return input;
  }),

  delete: protectedProcedure.input(z.number()).mutation(({ input }) => {
    return input;
  }),
});
