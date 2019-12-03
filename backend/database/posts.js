import {db, firstOrUndefined} from "./database.js";

export async function getPost(username, urlSlug) {
    const query = `
        SELECT
            posts."urlSlug",
            posts."title",
            posts."content",
            posts."authorId",
            posts."datePosted",
            json_build_object(
              'id',  users.id,
              'username', users.username
            ) as author
        FROM posts
        JOIN users ON users.id = posts."authorId"
        WHERE
            "urlSlug" = $(urlSlug) AND
            "username" = $(username)
    `;
    const params = {
        urlSlug,
        username
    };
    return await firstOrUndefined(query, params);
}

export async function getPostPreviews(username, maxDate, limit = 10) {
    let query = `
        SELECT 
            posts."urlSlug",
            posts."title",
            LEFT(posts."content", 1000) as content,
            posts."authorId",
            posts."datePosted",
            json_build_object(
              'id',  users.id,
              'username', users.username
            ) as author,
            (
                SELECT COUNT(*)
                FROM comments
                WHERE comments."postId" = posts.id
            ) as "commentCount"
        FROM posts
        JOIN users ON users."id" = posts."authorId"
        WHERE
            ($(maxDate) IS NULL OR posts."datePosted" < $(maxDate))
            ${username ? `AND users."username" = $(username)` : ""}
        ORDER BY posts."datePosted" DESC
        LIMIT $(limit)
    `;
    const params = {
        username,
        maxDate,
        limit
    };
    return db.any(query, params);
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
    return db.any(query, params);
}