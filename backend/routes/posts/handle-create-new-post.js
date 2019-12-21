import {getPostByUsernameUrlSlug, insertPost} from "../../database/posts.js";
import crypto from "crypto";
import {validateContent, validateTitle} from "../../validation.js";

const ADD_RANDOMNESS_TO_URL_SLUGS = false;

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
    if (!validateTitle(title)) {
        return res.status(400).send("Invalid title.");
    }
    if (!validateContent(content)) {
        return res.status(400).send("Invalid content.");
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
    const insertedPost = await getPostByUsernameUrlSlug(user.username, urlSlug);
    if (insertedPost == null) {
        throw new Error("Couldn't find the inserted post.");
    }
    res.send(insertedPost);
};

function titleToUrlSlug(title) {
    let urlSlug = title
        .toLowerCase()
        .replace(/[^\w ]+/g,"")
        .replace(/ +/g,"-");
    if (ADD_RANDOMNESS_TO_URL_SLUGS) {
        urlSlug += `-${crypto.randomBytes(10).toString("hex")}`;
    }
    return urlSlug;
}

export default handleCreateNewPost;