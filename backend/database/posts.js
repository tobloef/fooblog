import {db} from "./database.js";

export async function getPostByUrlSlug(urlSlug) {
    const query = `
        SELECT
            posts.*,
            json_build_object(
              'id',  users.id,
              'username', users.username
            ) as user
        FROM posts
        JOIN users ON users.id = posts."authorId"
        WHERE "urlSlug" = $(urlSlug)
    `;
    const params = {
        urlSlug
    };
    return await db.any(query, params);
}

export async function getPosts(username, maxDate, limit = 10) {
    let query = `
        SELECT 
            posts.*,
            json_build_object(
              'id',  users.id,
              'username', users.username
            ) as user
        FROM posts
        JOIN users ON users."id" = posts."authorId"
        WHERE
            posts."datePosted" > $(maxDate)
            ${username ? `AND users."username" = $(username)` : ""}
        ORDER BY posts."datePosted"
        LIMIT $(limit)
    `;
    const params = {
        username,
        maxDate,
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
            "authorId",
            "datePosted"
        ) VALUES (
            $(urlSlug),
            $(title),
            $(content),
            $(authorId),
            $(datePosted)
        )
    `;
    const params = {
        urlSlug: post.urlSlug,
        title: post.title,
        content: post.content,
        authorId: post.authorId,
        datePosted: post.datePosted,
    };
    return await db.any(query, params);
}