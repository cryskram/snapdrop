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
      {
        slug,
        content,
        password,
      }: { slug: string; content: string; password?: string }
    ) => {
      // const exist = await prisma.note.findUnique({ where: { slug } });

      // if (exist) {
      //   return await prisma.note.update({
      //     where: { slug },
      //     data: {
      //       content,
      //       ...(password !== undefined ? { password } : {}),
      //     },
      //   });
      // } else {
      //   return await prisma.note.create({
      //     data: {
      //       slug,
      //       content,
      //       password: password ?? "",
      //     },
      //   });
      // }

      return prisma.note.upsert({
        where: { slug },
        create: {
          slug,
          content,
          password: password ?? "",
        },
        update: {
          content,
          ...(password !== undefined ? { password } : {}),
        },
      });
    },
  },
};
