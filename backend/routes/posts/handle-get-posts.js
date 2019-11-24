import {getPosts} from "../../database/posts.js";

const handleGetPosts = async (req, res) => {
    const {maxDate, username, limit} = req.query;
    const posts = await getPosts(username, maxDate, limit);
    res.send(posts);
};

export default handleGetPosts;