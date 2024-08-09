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
    thoughts: [Thought]!
    exerciseLogs: [ExerciseLog]


  }

  type ExerciseCategory {
    _id: ID!
    name: String!
  }

    type ExerciseLog {
    _id: ID!
    user: User!
    category: ExerciseCategory!
    duration: Int!
    date: String!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
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
    
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, gender:String!, age: Int!, height: Float!, weight: Float!, goal: String!): Auth
    login(email: String!, password: String!): Auth

    addExerciseCategory(name: String!): ExerciseCategory
    addExerciseLog(categoryId: ID!, duration: Int!): ExerciseLog

    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought

  }
`;

module.exports = typeDefs;
