import {getUserByUsername, insertUser} from "../../database/users.js";
import {hashPassword} from "./auth.js";

const handleRegister = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username == null || password == null) {
        return res.status(400).send("Missing username or password.");
    }
    const existingUser = await getUserByUsername(username);
    if (existingUser != null) {
        return res.status(409).send("A user with that username already exists.");
    }
    const passwordHash = await hashPassword(password);
    const user = {
        username,
        passwordHash,
    };
    await insertUser(user);
    res.status(200).send();
};

export default handleRegister;