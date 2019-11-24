import {getUserByUsername, insertUser} from "../../database/users.js";
import {hashPassword} from "./auth.js";

const handleRegister = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username == null || password == null) {
        return res.status(400).send("Missing username or password.");
    }
    const passwordHash = hashPassword(password);
    const user = {
        username,
        passwordHash,
    };
    try {
        await insertUser(user);
    } catch (error) {
        console.error(error);
        // TODO
    }
    res.status(200).send();
};

export default handleRegister;