// src/graphql/index.ts

export const typeDefs = `#graphql
  type User {
    id: Int!
    fullName: String
    email: String!
    password: String
  }

  type Query {
    getUsers: [User!]!
    getUserById(id: Int!): User
  }

  type Mutation {
    createUser(fullName: String, email: String!, password: String): User!
  }
`;