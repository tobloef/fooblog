import { getUserByUsername } from "../database/users.js";
import { checkUserCredentials, generateAuthToken } from "../auth.js";

const login = async (_, {username, password}) => {
    if (username == null || password == null) {
        throw new Error("Missing username or password");
    }
    const user = await getUserByUsername(username, true);
    if (user == null) {
        throw new Error(`No user with username "${username}"`);
    }
    if (!(await checkUserCredentials(user.passwordHash, password))) {
        throw new Error("Incorrect password");
    }
    const payload = {
        user: {
            id: user.id,
            username: user.username,
        }
    };
    return await generateAuthToken(payload)
};

export default login;