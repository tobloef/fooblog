import {getUserByUsername, insertUser} from "../../database/users.js";
import {hashPassword} from "./auth.js";
import {validatePassword, validateUsername} from "../../validation.js";

const handleRegister = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!validateUsername(username)) {
        return res.status(400).send("Invalid username.");
    }
    if (!validatePassword(password)) {
        return res.status(400).send("Invalid password.");
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