import {getUserByUsername} from "../../database/users.js";

const handleGetUserFromUsername = async (req, res) => {
    const {username} = req.params;
    const user = await getUserByUsername(username);
    if (user == null) {
        return res.status(404).send(`No user found with username "${username}".`);
    }
    res.send(user);
};

export default handleGetUserFromUsername;