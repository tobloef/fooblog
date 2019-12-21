import { gql } from "apollo-server"

const typeDefs = gql`
scalar GraphQLDateTime

type Query {
    posts(maxDate: GraphQLDateTime, limit: Int): [Post!]!
    post(username: String!, urlSlug: String!): Post
    user(username: String!): User
}

type Mutation {
    login(username: String!, password: String!): String
    register(username: String!, password: String!): User
    createPost(title: String!, content: String!): Post
    createComment(username: String!, postUrlSlug: String!, content: String!): Comment
}

type User {
    id: ID!
    username: String!
    passwordHash: String!
    posts(maxDate: GraphQLDateTime, limit: Int): [Post!]!
}

type Post {
    id: ID!
    author: User!
    urlSlug: String!
    title: String!
    content: String!
    datePosted: GraphQLDateTime!
    comments: [Comment!]!
    commentCount: Int!
}

type Comment {
    id: ID!
    author: User!
    content: String!
    datePosted: GraphQLDateTime!
}
`;

export default typeDefs;