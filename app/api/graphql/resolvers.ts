import { prisma } from "@/lib/prisma";

export const resolvers = {
  Query: {
    getNote: async (_: any, { slug }: { slug: string }) => {
      return await prisma.note.findUnique({
        where: {
          slug: slug,
        },
      });
    },
  },

  Mutation: {
    saveNote: async (
      _: any,
      { slug, content }: { slug: string; content: string }
    ) => {
      return await prisma.note.upsert({
        where: { slug: slug },
        create: { slug: slug, content: content },
        update: { content },
      });
    },
  },
};
