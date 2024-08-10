const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    gender: String 
    age: Int 
    height: Float 
    weight:Float 
    goal:String 
    exerciseLogs: [ExerciseLog]
  }

  type ExerciseCategory {
    _id: ID!
    name: String!
  }

input ExerciseLogInput {
  categoryId: ID!
  duration: Int!
  date: String
}

type ExerciseLog {
  _id: ID!
  categoryId: ID!
  duration: Int!
  date: String!
  userId: ID!
}



  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    exerciseCategories: [ExerciseCategory]
    exerciseLogs(userId: ID!): [ExerciseLog]
    me: User

  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, gender:String!, age: Int!, height: Float!, weight: Float!, goal: String!): Auth
    login(email: String!, password: String!): Auth

    addExerciseCategory(name: String!): ExerciseCategory
    addExerciseLog(input: ExerciseLogInput!): ExerciseLog

 
  }
`;

module.exports = typeDefs;
