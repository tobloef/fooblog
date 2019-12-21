import {getPostByUsernameUrlSlug} from "../../database/posts.js";

const handleGetUserPost = async (req, res) => {
    const {username, urlSlug} = req.params;
    const post = await getPostByUsernameUrlSlug(username, urlSlug);
    if (post == null) {
        return res.status(404).send(`The post could not be found.`);
    }
    res.send(post);
};

export default handleGetUserPost;