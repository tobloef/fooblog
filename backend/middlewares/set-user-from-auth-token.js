import {verifyAuthToken} from "../routes/auth/auth.js";
import {getUserById} from "../database/users.js";

export async function setUserFromAuthToken(req, res, next) {
    const authToken = req.locals.authToken;
    if (authToken == null) {
        return next();
    }
    let payload;
    try {
        payload = verifyAuthToken(authToken);
    } catch (error) {
        return res.status(403).send("Could not verify the user.");
    }
    if ((payload.user || {}).id == null) {
        return res.status(400).send("No user id found in auth token.");
    }
    const user = await getUserById(payload.user.id);
    if (user == null) {
        return res.status(404).send("User to authenticate not found.");
    }
    req.locals.user = user;
    return next();
}