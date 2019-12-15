import {db, firstOrUndefined} from "./database.js";

export async function getPostComments(username, postUrlSlug) {
    let query = `
        SELECT
            comments.*,
            json_build_object(
              'id',  "commentAuthor".id,
              'username', "commentAuthor".username
            ) as author
        FROM comments
        JOIN posts ON posts."id" = comments."postId"
        JOIN users as "commentAuthor" ON "commentAuthor"."id" = comments."authorId"
        JOIN users as "postAuthor" ON "postAuthor"."id" = posts."authorId"
        WHERE
            posts."urlSlug" = $(postUrlSlug) AND
            "postAuthor"."username" = $(username)
        ORDER BY posts."datePosted" DESC
    `;
    const params = {
        username,
        postUrlSlug
    };
    return await db.any(query, params);
}

export async function insertComment(comment) {
    const query = `
        INSERT INTO comments (
            "content",
            "authorId",
            "datePosted",
            "postId"
        ) VALUES (
            $(content),
            $(authorId),
            $(datePosted),
            $(postId)
        )
        RETURNING id
    `;
    const params = {
        content: comment.content,
        authorId: comment.authorId,
        datePosted: comment.datePosted,
        postId: comment.postId,
    };
    return await db.any(query, params);
}

export async function getComment(id) {
    const query = `
        SELECT
            comments.*,
            json_build_object(
              'id',  users.id,
              'username', users.username
            ) as author
        FROM comments
        JOIN users ON users."id" = comments."authorId"
        WHERE comments.id = $(id)
    `;
    const params = {
        id: id,
    };
    return await firstOrUndefined(query, params);
}