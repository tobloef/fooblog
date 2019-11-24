import {getPosts} from "../../database/posts.js";

const handleGetPosts = async (req, res) => {
    const {maxDate, limit} = req.query;
    const posts = await getPosts(null, maxDate, limit);
    res.send(posts);
};

export default handleGetPosts;