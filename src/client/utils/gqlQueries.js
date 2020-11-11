import { gql } from 'apollo-boost';

const USER_HOBBIES = gql`
  query User {
    user {
      hobbies {
        name
      }
    }
  }
`;

const ADD_USER_HOBBY = gql`
  mutation addUserHobby($hobby: ID!) {
    addUserHobby(hobby: $hobby)
  }
`;

const REMOVE_USER_HOBBY = gql`
  mutation removeUserHobby($hobby: ID!) {
    removeUserHobby(hobby: $hobby)
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

export {
  USER_HOBBIES,
  ADD_USER_HOBBY,
  REMOVE_USER_HOBBY,
  UPDATE_USER,
  DELETE_USER
};
