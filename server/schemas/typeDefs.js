const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    gender: String 
    age: Int 
    height: Float 
    weight: Float 
    goal: String 
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
    category: String!
    categorySpecificData: CategorySpecificData
    duration: Int!
    date: String!
    userId: ID!
  }
  
  type CategorySpecificData {
    yoga: YogaData
    stretching: StretchingData
    weightlifting: WeightliftingData
    cardio: CardioData
  }
  
  type YogaData {
    instructor: String
    level: String
  }

  type StretchingData {
    equipment: String
    focus: String
  }

  type WeightliftingData {
    sets: Int
    reps: Int
    weight: Float
  }

  type CardioData {
    distance: Float
    intensity: String
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
    getExerciseLogs(userId: ID!): [ExerciseLog]
    me: User
    getEachExercise(_id: ID!): ExerciseLog 
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, gender: String!, age: Int!, height: Float!, weight: Float!, goal: String!): Auth
    login(email: String!, password: String!): Auth

    addExerciseCategory(name: String!): ExerciseCategory
    addExerciseLog(category: String!, categorySpecificData: CategorySpecificDataInput!, duration: Int!, date: String!): ExerciseLog
  }

  input CategorySpecificDataInput {
    yoga: YogaDataInput
    stretching: StretchingDataInput
    weightlifting: WeightliftingDataInput
    cardio: CardioDataInput
  }

  input YogaDataInput {
    instructor: String
    level: String
  }

  input StretchingDataInput {
    equipment: String
    focus: String
  }

  input WeightliftingDataInput {
    sets: Int
    reps: Int
    weight: Float
  }

  input CardioDataInput {
    distance: Float
    intensity: String
  }
`;

module.exports = typeDefs;
