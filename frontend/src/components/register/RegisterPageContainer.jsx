import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "./RegisterForm.jsx";
import {withRouter} from "react-router-dom";
import {registerUser} from "../../api.js";
import {Header} from "semantic-ui-react";

class RegisterPageContainer extends React.Component {
    state = {
        errorMessage: null,
        submitting: false,
        registrationCompleted: false,
        username: "",
        password: "",
        confirmPassword: "",
    };

    componentDidMount() {
        const {user, history} = this.props;
        if (user != null) {
            history.push("/");
        }
    }

    register = async (username, password, confirmPassword) => {
        this.setState({submitting: true, errorMessage: null});
        try {
            if (confirmPassword !== password) {
                this.setState({errorMessage: "Passwords doesn't match."});
                return;
            }
            await registerUser(username, password);
            this.setState({
                registrationCompleted: true,
                username: "",
                password: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.error("Error registering user.", error);
            this.setState({errorMessage: error.statusText || "An error occurred."});
        } finally {
            this.setState({submitting: false});
        }
    };

    render() {
        const {
            errorMessage,
            registrationCompleted,
            submitting,
            username,
            password,
            confirmPassword
        } = this.state;

        return <>
            <Header as="h1" content={"Register user"} />
            <RegisterForm
                onSubmit={async () => {
                    if (submitting) {
                        return;
                    }
                    await this.register(username, password, confirmPassword);
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
    }
}

RegisterPageContainer.propTypes = {
    user: PropTypes.object,
};

export default withRouter(RegisterPageContainer);