import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Note {
    id: ID!
    slug: String!
    content: String!
    updatedAt: String!
  }

  type Query {
    getNote(slug: String!): Note
  }

  type Mutation {
    saveNote(slug: String!, content: String!): Note!
  }
`;
