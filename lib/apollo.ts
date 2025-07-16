import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "/api/graphql",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
