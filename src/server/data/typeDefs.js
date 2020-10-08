const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    email: ID!
    firstName: String!
    lastName: String!
    age: Int
    gender: String
    classStanding: String
    major: String
    sleepStart: Int
    sleepEnd: Int
    cleanliness: Int
    isComplete: Boolean!
    dorm: Dorm
    hobbies: [Hobby]
  }
  type Dorm {
    name: ID!
    neighborhood: String
    users: [User]
  }
  type Hobby {
    name: ID!
    users: [User]
  }
  type Query {
    user: User
    userEmail(email: ID!): User
    userDorm: [User]
    users: [User!]!
    dormName(name: ID!): Dorm
    dorms: [Dorm!]!
    hobbies: [Hobby!]!
  }
  type Mutation {
    addUserHobby(hobby: ID!): Int
    removeUserHobby(hobby: ID!): Int
    updateUser(
      email: ID!
      dorm: ID
      age: Int
      gender: String
      classStanding: String
      major: String
      sleepStart: Int
      sleepEnd: Int
      cleanliness: Int
    ): Int
    deleteUser(email: ID!): Int
  }
`;

module.exports = typeDefs;
