import { gql } from 'apollo-boost';

const USER = gql`
  query User($email: ID!) {
    User(email: $email) {
      age
      gender
      dorm {
        name
        neighborhood
      }
    }
  }
`;

const ADD_USER_HOBBY = gql`
  mutation addUserHobby($hobby: ID!) {
    addUserHobby(hobby: $hobby)
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $email: ID!
    $dorm: ID
    $age: Int
    $gender: String
    $classStanding: String
    $major: String
    $sleepStart: Int
    $sleepEnd: Int
    $cleanliness: Int
  ) {
    updateUser(
      email: $email
      dorm: $dorm
      age: $age
      gender: $gender
      classStanding: $classStanding
      major: $major
      sleepStart: $sleepStart
      sleepEnd: $sleepEnd
      cleanliness: $cleanliness
    )
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($email: ID!) {
    deleteUser(email: $email)
  }
`;

export { USER, ADD_USER_HOBBY, UPDATE_USER, DELETE_USER };
