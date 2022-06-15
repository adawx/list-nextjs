import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '../create-router';
import { prisma } from '../primsa';

const defaultListItemSelect = Prisma.validator<Prisma.ListItemSelect>()({
  id: true,
  listId: true,
  item: true,
  checked: true,
  createdAt: true,
  updatedAt: true,
});

export const listRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      id: z.number(),
      listId: z.number(),
      item: z.string().min(1).max(200),
      checked: z.number().min(0).max(1),
    }),
    async resolve({ input }) {
      const list = await prisma.listItem.create({
        data: input,
        select: defaultListItemSelect,
      });
      return list;
    },
  })
  .query('all', {
    async resolve() {
      const list = await prisma.listItem.findMany({
        select: defaultListItemSelect,
      });
      return list;
    },
  });
