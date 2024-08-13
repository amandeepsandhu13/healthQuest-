import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// adding new fields for the user to signup
export const ADD_USER = gql`
    mutation addUser(
        $username: String!
        $email: String!
        $password: String!
        $gender: String!
        $age: Int!
        $height: Float!
        $weight: Float!
        $goal: String!
    ) {
        addUser(
            username: $username
            email: $email
            password: $password
            gender: $gender
            age: $age
            height: $height
            weight: $weight
            goal: $goal
        ) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_EXERCISE_LOG = gql`
    mutation addExerciseLog(
        $category: String!
        $categorySpecificData: CategorySpecificDataInput!
        $duration: Int!
        $date: String!
    ) {
        addExerciseLog(
            category: $category
            categorySpecificData: $categorySpecificData
            duration: $duration
            date: $date
        ) {
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
            userId
        }
    }
`;

export const ADD_EXERCISE_CATEGORY = gql`
    mutation addExerciseCategory($name: String!) {
        addExerciseCategory(name: $name) {
            _id
            name
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

export const DELETE_EXERCISE_LOG = gql`
    mutation deleteExerciseLog($id: ID!) {
        deleteExerciseLog(_id: $id) {
            success
            message
        }
    }
`;
