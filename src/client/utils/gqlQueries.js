import { gql } from 'apollo-boost';

/* example! */
const USER = gql`
  {
    user {
      sid
      firstName
      lastName
      email
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
const CREATE_USER = gql`
  mutation MergeStudent(
    $sid: ID!
    $hostel: String!
    $age: Int
    $gender: String
  ) {
    CreateStudent(sid: $sid, hostel: $hostel, age: $age, gender: $gender) {
      sid
    }
  }
`;

/* create ranking for neo4j relationship  */
const CREATE_RANKING = gql`
  mutation CreateRanking($id: ID!, $rank: Int!) {
    CreateRanking(id: $id, rank: $rank) {
      id
    }
  }
`;

/* merge student node with ranking node */
const MERGE_STUDENT_RANKINGS = gql`
  mutation MergeStudentRankings($from: _StudentInput!, $to: _RankingInput!) {
    MergeStudentRankings(from: $from, to: $to) {
      from {
        sid
      }
      to {
        id
      }
    }
  }
`;

/* merge ranking node with personality trait node */
const MERGE_RANKING_TRAIT = gql`
  mutation MergeRankingTrait($from: _RankingInput!, $to: _TraitInput!) {
    MergeRankingTrait(from: $from, to: $to) {
      from {
        id
      }
      to {
        name
      }
    }
  }
`;

export {
  USER,
  UPDATE_USER,
  CREATE_USER,
  CREATE_RANKING,
  MERGE_STUDENT_RANKINGS,
  MERGE_RANKING_TRAIT
};
