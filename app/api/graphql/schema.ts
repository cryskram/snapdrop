import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Note {
    id: ID!
    slug: String!
    content: String!
    password: String
    updatedAt: String!
  }

  type Query {
    getNote(slug: String!): Note
    getNotes: [Note!]!
  }

  type Mutation {
    saveNote(slug: String!, content: String!, password: String): Note!
  }
`;
