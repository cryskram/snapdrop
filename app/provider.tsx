"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Toaster } from "react-hot-toast";

const client = new ApolloClient({
  uri: "/api/graphql",
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
