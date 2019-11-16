import jwt from "jsonwebtoken";

export function decodeAuthToken(token) {
    if (token == null) {
        throw new Error("Auth token cannot be null");
    }
    try {
        // noinspection JSUnresolvedVariable
        return jwt.decode(token);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return null;
        }
        throw error;
    }
}