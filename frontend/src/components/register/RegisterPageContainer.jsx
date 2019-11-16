import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "./RegisterForm.jsx";
import {withRouter} from "react-router-dom";
import {registerUser, setAuthToken} from "../../api.js";
import {decodeAuthToken} from "../../auth.js";
import LoginForm from "../login/LoginForm.jsx";
import {Header} from "semantic-ui-react";

class RegisterPageContainer extends React.Component {
    state = {
        errorMessage: null,
        submitting: false,
        registrationCompleted: false,
        username: "",
        password: "",
    };

    componentDidMount() {
        const {user, history} = this.props;
        if (user != null) {
            history.push("/");
        }
    }

    register = async (username, password) => {
        this.setState({submitting: true});
        try {
            await registerUser(username, password);
            this.setState({registrationCompleted: true});
        } catch (error) {
            console.error("Error registering user.", error);
            let errorMessage = "An error occurred.";
            // TODO: Check error type
            this.setState({errorMessage});
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
        } = this.state;

        return <>
            <Header as="h1" content={"Register user"} />
            <RegisterForm
                register={async () => {
                    if (submitting) {
                        return;
                    }
                    await this.register(username, password);
                }}
                errorMessage={errorMessage}
                submitting={submitting}
                registrationCompleted={registrationCompleted}
                onChangeUsername={(value) => this.setState({username: value})}
                onChangePassword={(value) => this.setState({password: value})}
            />
        </>
    }
}

RegisterPageContainer.propTypes = {
    user: PropTypes.object,
};

export default withRouter(RegisterPageContainer);