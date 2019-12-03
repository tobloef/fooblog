import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RegisterForm from "./RegisterForm.jsx";
import {withRouter} from "react-router-dom";
import {Header} from "semantic-ui-react";
import {connect} from "react-redux";
import useGenericAsync from "../../use-generic-async.js";
import * as api from "../../api.js";

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
        await api.registerUser(username, password);
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
            onChangeUsername={(value) => this.setState({username: value})}
            onChangePassword={(value) => this.setState({password: value})}
            onChangeConfirmPassword={(value) => this.setState({confirmPassword: value})}
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