import { validatePassword, validateUsername } from "../validation.js";
import { getUserByUsername, insertUser } from "../database/users.js";
import { hashPassword } from "../auth.js";

const register = async (_, {username, password}) => {
    if (!validateUsername(username)) {
        throw new Error("Invalid username.");
    }
    if (!validatePassword(password)) {
        throw new Error("Invalid password.");
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser != null) {
        throw new Error("A user with that username already exists.");
    }
    const passwordHash = await hashPassword(password);
    const user = {
        username,
        passwordHash,
    };
    await insertUser(user);
    return user;
};

export default register;