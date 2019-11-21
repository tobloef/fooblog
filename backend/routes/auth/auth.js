import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const EXPIRATION_TIME = "2d";

export async function checkUserCredentials(hash, password) {
    return await bcrypt.compare(password, hash);
}

export async function hashPassword(password) {
    return await bcrypt.hash(password, process.env.SALT_ITERATIONS);
}

export function verifyAuthToken(token) {
    if (token == null) {
        throw new Error("Auth token cannot be null");
    }
    try {
        // noinspection JSUnresolvedVariable
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw error;
    }
}

export function generateAuthToken(payload) {
    const options = {};
    options.expiresIn = EXPIRATION_TIME;
    // noinspection JSUnresolvedVariable
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}