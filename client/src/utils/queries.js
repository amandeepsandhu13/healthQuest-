import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      gender
      exerciseLogs {
        _id
        category
        categorySpecificData {
          yoga {
            instructor
            level
          }
         
        }
        duration
        date
      }
    }
  }
`;
export const GET_EXERCISE_CATEGORIES = gql`
    query getExerciseCategories {
        exerciseCategories {
            _id
            name
        }
    }
`;

export const GET_EXERCISE_LOGS = gql`
query getExerciseLogs($userId: ID!) {
  exerciseLogs(userId: $userId) {
    _id
    categoryId 
    duration
    date
  }
}
`;


export const QUERY_ME = gql`
  query {
    me {
      _id
      username
      email
      gender
      goal
      age
       height
       weight
       exerciseLogs {
        _id
        category
        categorySpecificData {
          yoga {
            instructor
            level
          }
          stretching {
            equipment
            focus
          }
          weightlifting {
            sets
            reps
            weight
          }
          cardio {
            distance
            intensity
          }

        }
        duration
        date
      }
    }
  }
`;