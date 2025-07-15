// app/api/graphql/route.ts
import { createYoga, createSchema } from "graphql-yoga";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

const yoga = createYoga<{
  req: NextRequest;
}>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response, Headers },
});

export { yoga as GET, yoga as POST };
