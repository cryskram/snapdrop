"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Toaster } from "react-hot-toast";

const client = new ApolloClient({
  uri: "/api/graphql",
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
  },
  cache: new InMemoryCache(),
});

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
      {children}
    </ApolloProvider>
  );
}
