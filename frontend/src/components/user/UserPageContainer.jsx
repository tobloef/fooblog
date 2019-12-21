import React, { useCallback, useState } from "react";
import UserPage from "./UserPage.jsx";
import {Message} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import useGenericAsync from "../../use-generic-async.js";
import { graphql } from "../../graphql/graphql.js";
import gql from "graphql-tag";

const GET_USER = gql`
    query GetUser($username: String!) {
        user(username: $username) {
            id
        }
    }
`;

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
        const {data: {user: newUser}} = await graphql.mutate({
            mutation: GET_USER,
            variables: {
                username
            }
        });
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
        loading={loading}
    />
};

export default withRouter(UserPageContainer);