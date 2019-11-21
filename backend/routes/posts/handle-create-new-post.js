import {insertPost} from "../../database/posts.js";
import crypto from "crypto";

const handleCreateNewPost = async (req, res) => {
    const {
        title,
        content
    } = req.body;
    const {
        user
    } = req.locals;

    if (user == null) {
        return res.status(401).send("User not logged in.");
    }
    if (title == null) {
        return res.status(400).send("Title is missing.");
    }
    if (content == null) {
        return res.status(400).send("Content is missing.");
    }
    const urlSlug = titleToUrlSlug(title);
    const post = {
        title,
        content,
        urlSlug,
        authorId: user.id,
        datePosted: new Date(),
    };
    await insertPost(post);
    res.status(200).send();
};

function titleToUrlSlug(title) {
    let urlSlug = title
        .toLowerCase()
        .replace(/[^\w ]+/g,"")
        .replace(/ +/g,"-");
    urlSlug += `-${crypto.randomBytes(10).toString("hex")}`;
    return urlSlug;
}

export default handleCreateNewPost;