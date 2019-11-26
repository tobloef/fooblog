import {getPosts} from "../../database/posts.js";

const handleGetUserPosts = async (req, res) => {
    const {username} = req.params;
    const {maxDate, limit} = req.query;
    const posts = await getPosts(username, maxDate, limit);
    res.send(posts);
};

export default handleGetUserPosts;