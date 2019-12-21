import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAuthTokenAction, setUserAction } from "../../redux/persist.js";
import useGenericAsync from "../../use-generic-async.js";
import { decodeAuthToken } from "../../auth.js";
import { Header } from "semantic-ui-react";
import LoginForm from "./LoginForm.jsx";
import gql from "graphql-tag";
import { graphql } from "../../graphql/graphql.js";

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password)
    }
`;

const LoginPage = ({
    setAuthToken,
    setLoggedInUser,
    user,
    history,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [
        submitting,
        errorMessage,
        login
    ] = useGenericAsync(async () => {
        const {data: {login: authToken}} = await graphql.mutate({
            mutation: LOGIN,
            variables: {
                username,
                password
            }
        });
        setAuthToken(authToken);
        const payload = decodeAuthToken(authToken);
        setLoggedInUser(payload.user);
        history.push("/");
    }, "Error logging in.");

    useEffect(() => {
        if (user != null) {
            history.push("/");
        }
    }, [user, history]);

    return <>
        <Header as="h1" content={"Log in"} />
        <LoginForm
            onSubmit={async () => {
                if (submitting) {
                    return;
                }
                await login(username, password);
            }}
            errorMessage={errorMessage}
            submitting={submitting}
            username={username}
            password={password}
            onChangeUsername={(value) => setUsername(value)}
            onChangePassword={(value) => setPassword(value)}
        />
    </>
};

LoginPage.propTypes = {
    user: PropTypes.object,
    setLoggedInUser: PropTypes.func.isRequired,
    setAuthToken: PropTypes.func.isRequired,
};

const stateToProps = (state) => ({
    user: state.persist.user,
});
const dispatchToProps = (dispatch) => ({
    setLoggedInUser: (user) => dispatch(setUserAction(user)),
    setAuthToken: (authToken) => dispatch(setAuthTokenAction(authToken)),
});

export default withRouter(connect(stateToProps, dispatchToProps)(LoginPage));