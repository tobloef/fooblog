import React, { useCallback, useState } from "react";
import UserPage from "./UserPage.jsx";
import {Message} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import useGenericAsync from "../../use-generic-async.js";
import * as api from "../../api.js";

const UserPageContainer = ({
    match,
}) => {
    const {username} = match.params;

    const [user, setUser] = useState(null);

    const [
        loading,
        errorMessage,
        fetchUser,
    ] = useGenericAsync(async () => {
        const newUser = await api.fetchUser(username);
        setUser(newUser);
    }, "Error fetching user.");

    useCallback(fetchUser, [username]);

    if (errorMessage) {
        return <Message
            error
            header={"Couldn't load user"}
            text={errorMessage}
        />
    }

    return <UserPage
        username={username}
        posts={(user || {}).posts}
        loading={loading}
    />
};

export default withRouter(UserPageContainer);