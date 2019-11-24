import {getPostComments} from "../../database/comments.js";

const handleGetUserPostComments = async (req, res) => {
    const {urlSlug} = req.params;
    const posts = await getPostComments(urlSlug);
    res.send(posts);
};

export default handleGetUserPostComments;