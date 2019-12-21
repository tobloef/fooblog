import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RegisterForm from "./RegisterForm.jsx";
import {withRouter} from "react-router-dom";
import {Header} from "semantic-ui-react";
import {connect} from "react-redux";
import useGenericAsync from "../../use-generic-async.js";
import { graphql } from "../../graphql/graphql.js";
import gql from "graphql-tag";

const REGISTER = gql`
    mutation Register($username: String!, $password: String!) {
        register(username: $username, password: $password) {
            id
        }
    }
`;

const RegisterPageContainer = ({
    user,
    history
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registrationCompleted, setRegistrationCompleted] = useState(false);

    const [
        submitting,
        errorMessage,
        registerUser
    ] = useGenericAsync(async () => {
        if (confirmPassword !== password) {
            const error = new Error("Passwords doesn't match.");
            error.errorMessage = "Passwords doesn't match.";
            throw error;
        }
        await graphql.mutate({
            mutation: REGISTER,
            variables: {
                username,
                password
            }
        });
        setRegistrationCompleted(true);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
    }, "Error registering user.");

    useEffect(() => {
        if (user != null) {
            history.push("/");
        }
    }, [user, history]);

    return <>
        <Header as="h1" content={"Register user"} />
        <RegisterForm
            onSubmit={async () => {
                if (submitting) {
                    return;
                }
                await registerUser();
            }}
            errorMessage={errorMessage}
            submitting={submitting}
            registrationCompleted={registrationCompleted}
            username={username}
            password={password}
            confirmPassword={confirmPassword}
            onChangeUsername={setUsername}
            onChangePassword={setPassword}
            onChangeConfirmPassword={setConfirmPassword}
        />
    </>
};

RegisterPageContainer.propTypes = {
    user: PropTypes.object,
};

const stateToProps = (state) => ({
    user: state.persist.user,
});

export default withRouter(connect(stateToProps)(RegisterPageContainer));