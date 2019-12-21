import crypto from "crypto";
import { validateContent, validateTitle } from "../validation.js";
import { getPost, insertPost } from "../database/posts.js";

const ADD_RANDOMNESS_TO_URL_SLUGS = false;

const createPost = async (_, {title, content}, {user}) => {
    if (user == null) {
        throw new Error("User not logged in.");
    }
    if (!validateTitle(title)) {
        throw new Error("Invalid title.");
    }
    if (!validateContent(content)) {
        throw new Error("Invalid content.");
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
    const insertedPost = await getPost(user.username, urlSlug);
    if (insertedPost == null) {
        throw new Error("Couldn't find the inserted post.");
    }
    return insertedPost;
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

export default createPost;