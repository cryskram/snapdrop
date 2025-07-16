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
  graphiql: process.env.NODE_ENV === "development",
  fetchAPI: { Request, Response, Headers },
  context: async ({ request }) => {
    const origin = request.headers.get("origin");

    const allowedOrigins = [
      "http://localhost:3000",
      "https://snapdropweb.vercel.app",
    ];

    if (origin && !allowedOrigins.includes(origin)) {
      throw new Error("Unauthorized origin");
    }

    const token = request.headers.get("X-API-Key");
    const expectedToken = process.env.API_SECRET;

    if (expectedToken && token !== expectedToken) {
      if (process.env.NODE_ENV === "production") {
        throw new Error("Invalid API key");
      } else {
        console.warn("Skipping API key check in dev");
      }
    }

    return { request };
  },
});

export async function GET(request: NextRequest) {
  return yoga.fetch(request);
}

export async function POST(request: NextRequest) {
  return yoga.fetch(request);
}
