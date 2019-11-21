import {checkUserCredentials, generateAuthToken} from "./auth.js";
import {getUserByUsername} from "../../database/users.js";

const handleLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username == null || password == null) {
        return res.status(400).send("Missing username or password.");
    }
    const user = await getUserByUsername(username, true);
    // noinspection JSUnresolvedVariable
    if (user == null) {
        return res.status(404).send(`No user with username "${username}".`);
    }
    if (!(await checkUserCredentials(user.passwordHash, password))) {
        return res.status(401).send("Incorrect password.");
    }
    const payload = {
        id: user.id,
        username: user.username,
    };
    let jwtSecret;
    const jwt = await generateAuthToken(payload);
    // Send auth token
    return res.send(jwt);
};

export default handleLogin;