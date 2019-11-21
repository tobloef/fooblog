import {getPostByUrlSlug} from "../../database/posts.js";

const handleGetPostFromSlug = async (req, res) => {
    const {urlSlug} = req.params;
    return await getPostByUrlSlug(urlSlug);
};

export default handleGetPostFromSlug;