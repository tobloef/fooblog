import {getPostComments} from "../../database/comments.js";

const handleGetUserPostComments = async (req, res) => {
    const {username, urlSlug} = req.params;
    const posts = await getPostComments(username, urlSlug);
    res.send(posts);
};

export default handleGetUserPostComments;