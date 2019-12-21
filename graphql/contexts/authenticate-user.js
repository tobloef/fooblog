import { verifyAuthToken } from "../auth.js";
import { getUserById } from "../database/users.js";

const authenticateUser = async ({req}) => {
    if (req.headers.authorization == null) {
        return;
        //throw new Error("No auth header provided");
    }
    const [_, authToken] = req.headers.authorization.split(" ");
    if (authToken == null) {
        throw new Error("Invalid auth header, no auth token");
    }
    if (authToken.length > 1000000) {
        throw new Error("Auth token too long");
    }
    let payload;
    try {
        payload = verifyAuthToken(authToken);
    } catch (error) {
        throw new Error("Could not verify the auth token");
    }

    if ((payload.user || {}).id == null) {
        throw new Error("No user id found in auth token");
    }
    const user = await getUserById(payload.user.id);
    if (user == null) {
        throw new Error(`User with id ${payload.user.id} not found`);
    }
    return {
        user
    }
};

export default authenticateUser;