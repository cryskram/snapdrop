import { createSchema, createYoga } from "graphql-yoga";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: "/api/graphql",
});

export { yoga as GET, yoga as POST };
export default yoga;
