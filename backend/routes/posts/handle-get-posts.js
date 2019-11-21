import {getPosts} from "../../database/posts.js";

const handleGetPosts = async (req, res) => {
    const {minDate, username, limit} = req.query;
    const posts = await getPosts(username, minDate, limit);
    res.send(posts);
};

export default handleGetPosts;