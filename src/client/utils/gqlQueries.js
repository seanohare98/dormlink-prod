import { gql } from 'apollo-boost';

/* example! */
const SIMILAR = gql`
  query similar($sid: String!) {
    similar(sid: $sid) {
      sid
      age
      gender
    }
  }
`;

/* update user during registration by assigning hostel  */
const UPDATE_USER = gql`
  mutation updateUser($sid: ID!, $hostel: ID!) {
    updateUser(sid: $sid, hostel: $hostel)
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

/* add HAS_TRAIT relationship */
const ADD_TRAIT_STUDENT_TRAITS = gql`
  mutation AddTraitStudentTraits(
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

export { SIMILAR, UPDATE_USER, MERGE_STUDENT, ADD_TRAIT_STUDENT_TRAITS };
