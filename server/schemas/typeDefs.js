const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

// /*************Activity log******/

  type ActivityLog {
    _id: ID
    userId: ID
    activityType: String
    duration: Int
    date: String
  }

  type Query {
    getActivityLogs(userId: ID!): [ActivityLog]
  }



/******************************/

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

    addActivityLog(userId: ID!, activityType: String!, duration: Int!): ActivityLog
    updateActivityLog(_id: ID!, activityType: String, duration: Int): ActivityLog

    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
   
  }
`;

module.exports = typeDefs;
