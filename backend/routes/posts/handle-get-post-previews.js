import {getPostPreviews} from "../../database/posts.js";

const handleGetPostPreviews = async (req, res) => {
    const {maxDate, limit} = req.query;
    const posts = await getPostPreviews(null, maxDate, limit);
    res.send(posts);
};

export default handleGetPostPreviews;