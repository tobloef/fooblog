import {db} from "./database.js";

export async function getUserByUsername(username, includePasswordHash) {
    const query = `
        SELECT
            id,
            username
            ${includePasswordHash ? ", passwordHash" : ""}
        FROM users
        WHERE
            username = $(username)
    `;
    const params = {
        username,
    };
    return await db.one(query, params);
}

export async function insertUser(user) {
    const query = `
        INSERT INTO users (
            username,
            passwordHash
        ) VALUES (
            $(username),
            $(passwordHash)
        )
    `;
    const params = {
        username: user.username,
        passwordHash: user.passwordHash
    };
    return await db.none(query, params);
}