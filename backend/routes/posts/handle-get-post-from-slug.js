import {getPostByUrlSlug} from "../../database/posts.js";

const handleGetPostFromSlug = async (req, res) => {
    const {urlSlug} = req.params;
    const post = await getPostByUrlSlug(urlSlug);
    res.send(post);
};

export default handleGetPostFromSlug;