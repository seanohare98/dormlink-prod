import { gql } from 'apollo-boost';

const STUDENT = gql`
  query Student($sid: String!) {
    Student(sid: $sid) {
      hostel
      age
      gender
    }
  }
`;

const USER_SID = gql`
  query userSid($sid: ID!) {
    userSid(sid: $sid) {
      firstName
      lastName
      email
      schedule
      studious
      cleanliness
      participation
      hostel {
        id
      }
    }
  }
`;

/* example! */
const SIMILAR = gql`
  query similar($sid: String, $hostel: String) {
    similar(sid: $sid, hostel: $hostel) {
      sid
      age
      gender
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($sid: ID!) {
    deleteUser(sid: $sid)
  }
`;

/* update user during registration by assigning hostel  */
const UPDATE_USER = gql`
  mutation updateUser(
    $sid: ID!
    $hostel: ID
    $schedule: Int
    $cleanliness: Int
    $studious: Int
    $participation: Int
  ) {
    updateUser(
      sid: $sid
      hostel: $hostel
      schedule: $schedule
      cleanliness: $cleanliness
      studious: $studious
      participation: $participation
    )
  }
`;

/* create user in neo4j  */
const MERGE_STUDENT = gql`
  mutation MergeStudent(
    $sid: String!
    $hostel: String!
    $age: Int
    $gender: String
  ) {
    CreateStudent(sid: $sid, hostel: $hostel, age: $age, gender: $gender) {
      sid
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $sid: String!
    $hostel: String!
    $age: Int
    $gender: String
  ) {
    UpdateStudent(sid: $sid, hostel: $hostel, age: $age, gender: $gender) {
      sid
    }
  }
`;
/* add HAS_TRAIT relationship */
const ADD_TRAIT_STUDENT_TRAITS = gql`
  mutation UpdateTraitStudentTraits(
    $from: _StudentInput!
    $to: _TraitInput!
    $data: _HasTraitInput!
  ) {
    AddTraitStudentTraits(from: $from, to: $to, data: $data) {
      from {
        sid
      }
      to {
        name
      }
      strength
    }
  }
`;

const DELETE_STUDENT = gql`
  mutation DeleteStudent($sid: String!) {
    DeleteStudent(sid: $sid)
  }
`;

const UPDATE_AGAIN = gql`
  mutation updateAgain($sid: String!) {
    updateAgain(sid: $sid)
  }
`;

const UPDATE_TRAIT_STUDENT_TRAITS = gql`
  mutation UpdateTraitStudentTraits(
    $from: _StudentInput!
    $to: _TraitInput!
    $data: _HasTraitInput!
  ) {
    UpdateTraitStudentTraits(from: $from, to: $to, data: $data) {
      from {
        sid
      }
      to {
        name
      }
      strength
    }
  }
`;

export {
  STUDENT,
  USER_SID,
  SIMILAR,
  UPDATE_USER,
  DELETE_USER,
  MERGE_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
  UPDATE_TRAIT_STUDENT_TRAITS,
  ADD_TRAIT_STUDENT_TRAITS,
  UPDATE_AGAIN
};
