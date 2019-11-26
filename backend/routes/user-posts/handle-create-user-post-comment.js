import {getPost} from "../../database/posts.js";
import {getComment, insertComment} from "../../database/comments.js";

const handleCreateUserPostComment = async (req, res) => {
    const {
        content
    } = req.body;
    const {
        user
    } = req.locals;
    const {
        urlSlug,
        username
    } = req.params;

    if (user == null) {
        return res.status(401).send("User not logged in.");
    }
    if (content == null) {
        return res.status(400).send("Content is missing.");
    }
    const post = await getPost(username, urlSlug);
    if (post == null) {
        return res.status(400).send("Invalid post to add comment to.");
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
    res.send(insertedComment);
};

export default handleCreateUserPostComment;