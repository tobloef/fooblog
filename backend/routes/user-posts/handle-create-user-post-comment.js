import {getPost} from "../../database/posts.js";
import {insertComment} from "../../database/comments.js";

const handleCreateUserPostComment = async (req, res) => {
    const {
        content
    } = req.body;
    const {
        user
    } = req.locals;
    const {
        urlSlug
    } = req.params;

    if (user == null) {
        return res.status(401).send("User not logged in.");
    }
    if (content == null) {
        return res.status(400).send("Content is missing.");
    }
    const post = await getPost(urlSlug);
    if (post == null) {
        return res.status(400).send("Invalid post to add comment to.");
    }
    const comment = {
        content,
        authorId: user.id,
        datePosted: new Date(),
        postId: post.id,
    };
    await insertComment(comment);
    res.status(200).send();
};

export default handleCreateUserPostComment;