import {db} from "./database.js";

export async function getPostByUrlSlug(urlSlug) {
    const query = `
        SELECT *
        FROM posts
        WHERE "urlSlug" = $(urlSlug)
    `;
    const params = {
        urlSlug
    };
    return await db.any(query, params);
}

export async function getPosts(username, oldestDate, limit = 10) {
    let query = `
        SELECT *
        FROM users
        WHERE
            "datePosted" > $(oldestDate)
            ${username ? `AND "username" = $(username)` : ""}
        ORDER BY "datePosted"
        LIMIT $(limit)
    `;
    const params = {
        oldestDate,
        limit
    };
    return await db.any(query, params);
}

export async function insertPost(post) {
    const query = `
        INSERT INTO posts (
            "urlSlug",
            "title",
            "content",
            "authorId"
        ) VALUES (
            $(urlSlug),
            $(title),
            $(content),
            $(authorId)
        )
    `;
    const params = {
        urlSlug: post.urlSlug,
        title: post.title,
        content: post.content,
        authorId: post.authorId,
    };
    return await db.any(query, params);
}