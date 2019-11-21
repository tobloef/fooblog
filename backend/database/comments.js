import {db} from "./database.js";

export async function getCommentsByPostSlug(postUrlSlug) {
    let query = `
        SELECT *
        FROM comments
        JOIN posts ON posts."id" = comments."postId"
        LEFT JOIN users ON users."id" = comments."authorId"
        WHERE posts."postUrlSlug" = $(postUrlSlug)
        ORDER BY "datePosted"
    `;
    const params = {
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
    `;
    const params = {
        content: comment.content,
        authorId: comment.authorId,
        datePosted: comment.datePosted,
        postId: comment.postId,
    };
    return await db.any(query, params);
}