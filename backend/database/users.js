import {db, firstOrUndefined} from "./database.js";

export async function getUserById(id, includePasswordHash) {
    return await getUser("id", id, includePasswordHash);
}

export async function getUserByUsername(username, includePasswordHash) {
    return await getUser("username", username, includePasswordHash);
}

async function getUser(selectorKey, selectorValue, includePasswordHash) {
    const query = `
        SELECT
            id,
            username
            ${includePasswordHash ? `, "passwordHash"` : ""}
        FROM users
        WHERE
            users.$(selectorKey~) = $(selectorValue)
    `;
    const params = {
        selectorKey,
        selectorValue,
    };
    return await firstOrUndefined(query, params);
}

export async function insertUser(user) {
    const query = `
        INSERT INTO users (
            username,
            "passwordHash"
        ) VALUES (
            $(username),
            $(passwordHash)
        )
        RETURNING id
    `;
    const params = {
        username: user.username,
        passwordHash: user.passwordHash
    };
    return await db.any(query, params);
}