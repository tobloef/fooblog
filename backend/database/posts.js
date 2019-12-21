import {firstOrUndefined, db} from "./database.js";

export async function getPost(username, urlSlug) {
    const query = `
        SELECT
            posts."id",
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
            posts."urlSlug" = $(urlSlug) AND
            users."username" = $(username)
    `;
    const params = {
        urlSlug,
        username
    };
    return await firstOrUndefined(query, params);
}

export async function getPostById(id) {
    const query = `
        SELECT
            posts."id",
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
            posts."id" = $(id)
    `;
    const params = {
        id,
    };
    return await firstOrUndefined(query, params);
}

export async function getPostPreviews(username, maxDate, limit = 10) {
    let query = `
        SELECT 
            posts."id",
            posts."urlSlug",
            posts."title",
            LEFT(posts."content", 1000) as "preview",
            posts."content",
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
        RETURNING id
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