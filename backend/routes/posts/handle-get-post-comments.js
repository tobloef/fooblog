import {getPosts} from "../../database/posts.js";
import {getCommentsByPostSlug} from "../../database/comments.js";

const handleGetPostComments = async (req, res) => {
    const {urlSlug} = req.params;
    const posts = await getCommentsByPostSlug(urlSlug);
    res.send(posts);
};

export default handleGetPostComments;