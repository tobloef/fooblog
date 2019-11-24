import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function checkUserCredentials(hash, password) {
    return await bcrypt.compare(password, hash);
}

export async function hashPassword(password) {
    return await bcrypt.hash(password, Number(process.env.SALT_ITERATIONS));
}

export function verifyAuthToken(token) {
    if (token == null) {
        throw new Error("Auth token cannot be null");
    }
    return jwt.verify(token, process.env.JWT_SECRET);
}

export function generateAuthToken(payload) {
    const options = {};
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}