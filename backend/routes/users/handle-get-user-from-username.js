import {getUserByUsername} from "../../database/users.js";

const handleGetUserFromUsername = async (req, res) => {
    const {username} = req.params;
    const user = await getUserByUsername(username);
    res.send(user);
};

export default handleGetUserFromUsername;