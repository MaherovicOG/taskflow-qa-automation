// src/graphql/index.ts

export const typeDefs = `#graphql
  type User {
    id: Int!
    fullName: String
    email: String!
    password: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getUsers: [User!]!
    getUserById(id: Int!): User
    me: User
  }

  type Mutation {
    signup(fullName: String, email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
    createUser(fullName: String, email: String!, password: String): User!
  }

`;