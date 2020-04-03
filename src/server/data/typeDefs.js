const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    sid: ID!
    firstName: String!
    lastName: String!
    email: String!
    hostel: Hostel
    isComplete: Boolean!
  }
  type Hostel {
    id: ID!
    name: String
    content: String!
    users: [User]
  }
  type Query {
    user(sid: ID): User
    users: [User!]!
    hostel(id: ID!): Hostel
    hostels: [Hostel!]!
  }
  type Mutation {
    createUser(
      sid: ID!
      firstName: String!
      lastName: String!
      email: String!
      hostel: ID
      isComplete: Boolean
    ): User!
    updateUser(sid: ID!, hostel: ID): [Int!]!
    deleteUser(sid: ID!): Int!
  }
`;

module.exports = typeDefs;
