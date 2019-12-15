import {GraphQLDateTime} from "graphql-iso-date";
import {getPost, getPostPreviews} from "./database/posts.js";
import {getUserById, getUserByUsername} from "./database/users.js";
import {getPostComments} from "./database/comments.js";

const Query = {
    posts: async (_, {maxDate, limit}) => {
        return await getPostPreviews(maxDate, limit);
    },
    post: async (_, {username, urlSlug}) => {
        return await getPost(username, urlSlug);
    },
    user: async (_, {username}) => {
        return await getUserByUsername(username);
    },
    login: (_, {username, password}) => {

    },
};

const Mutation = {
    createUser: (_, {username, password}) => {

    },
    createPost: (_, {title, content}) => {

    },
    createComment: (_, {postId, content}) => {

    },
};

const resolvers = {
    GraphQLDateTime,
    Query,
    Mutation,
    Post: {
        author: (post) => {
            return getUserById(post.authorId);
        },
        comments: (post) => {
            return getPostComments(post.author.username, post.urlSlug);
        }
    },
    Comment: {
        author: (comment) => {
            return getUserById(comment.authorId);
        },
    },
    User: {
        posts: (user, {maxDate, limit}) => {
            return getPostPreviews(user.username, maxDate, limit);
        }
    }
};

export default resolvers;