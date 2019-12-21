import { validateContent } from "../validation.js";
import { getPostById } from "../database/posts.js";
import { getComment, insertComment } from "../database/comments.js";

const createComment = async (_, {postId, content}, {user}) => {
    if (user == null) {
        throw new Error("User not logged in.");
    }
    if (!validateContent(content)) {
        throw new Error("Invalid content.")
    }
    const post = await getPostById(postId);
    if (post == null) {
        throw new Error("Invalid post to add comment to.");
    }
    const comment = {
        content,
        authorId: user.id,
        datePosted: new Date(),
        postId: post.id,
    };
    const [{id: commentId}] = await insertComment(comment);
    const insertedComment = await getComment(commentId);
    if (insertedComment == null) {
        throw new Error("Couldn't find the inserted post.");
    }
    return insertedComment;
};

export default createComment;