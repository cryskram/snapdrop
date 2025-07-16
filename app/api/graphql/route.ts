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
  context: async ({ req }) => {
    const origin = req.headers.get("origin");
    const allowedOrigins = [
      "http://localhost:3000",
      "https://snapdropweb.vercel.app",
    ];

    if (origin && !allowedOrigins.includes(origin)) {
      throw new Error("Unauthorized origin");
    }

    const token = req.headers.get("x-api-key");
    const expectedToken = process.env.API_SECRET;

    if (expectedToken && token !== expectedToken) {
      throw new Error("Invalid API key");
    }

    return { req };
  },
});

export async function GET(request: NextRequest) {
  return yoga.fetch(request);
}

export async function POST(request: NextRequest) {
  return yoga.fetch(request);
}
