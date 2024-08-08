import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser(
        $name: String!
        $email: String!
        $password: String!
        $height: Number!
        $age: Number!
        $weight: Number!
        $goal: String!
    ) {
        addUser(
            name: $name
            email: $email
            password: $password
            height: $height
            age: $age
            weight: $weight
            goal: $goal
        ) {
            token
            user {
                _id
                name
            }
        }
    }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
