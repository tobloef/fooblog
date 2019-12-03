import React from "react";
import LoginForm from "./LoginForm.jsx";
import {login} from "../../api.js";
import {decodeAuthToken} from "../../auth.js";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {Header} from "semantic-ui-react";
import {connect} from "react-redux";
import {setAuthTokenAction, setUserAction} from "../../redux/persist.js";

class LoginPage extends React.Component {
    state = {
        errorMessage: null,
        submitting: false,
        username: "",
        password: "",
    };

    componentDidMount() {
        const {user, history} = this.props;
        if (user != null) {
            history.push("/");
        }
    }

    login = async (username, password) => {
        const {setLoggedInUser, setAuthToken, history} = this.props;

        this.setState({submitting: true, errorMessage: null});
        try {
            const authToken = await login(username, password);
            setAuthToken(authToken);
            const payload = decodeAuthToken(authToken);
            setLoggedInUser(payload.user);
            history.push("/");
        } catch (error) {
            console.error("Error logging in.", error);
            this.setState({errorMessage: error.statusText || "An error occurred."});
        } finally {
            this.setState({submitting: false});
        }
    };

    render() {
        const {
            errorMessage,
            submitting,
            username,
            password,
        } = this.state;

        return <>
            <Header as="h1" content={"Log in"} />
            <LoginForm
                onSubmit={async () => {
                    if (submitting) {
                        return;
                    }
                    await this.login(username, password);
                }}
                errorMessage={errorMessage}
                submitting={submitting}
                username={username}
                password={password}
                onChangeUsername={(value) => this.setState({username: value})}
                onChangePassword={(value) => this.setState({password: value})}
            />
        </>
    }
}

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