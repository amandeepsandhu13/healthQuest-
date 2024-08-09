const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!

  }

  type ExerciseCategory {
    id: ID!
    name: String!
  }

  type ExerciseLog {
    id: ID!
    user: User!
    category: ExerciseCategory!
    duration: Int!
    date: String!
  }

  type Query {
    exerciseCategories: [ExerciseCategory]
    exerciseLogs(userId: ID!): [ExerciseLog]
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
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought

     addExerciseCategory(name: String!): ExerciseCategory
    addExerciseLog(userId: ID!, categoryId: ID!, duration: Int!): ExerciseLog
    updateExerciseLog(id: ID!, duration: Int!): ExerciseLog
 
  }
`;

module.exports = typeDefs;
