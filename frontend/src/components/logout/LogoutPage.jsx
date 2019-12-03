import React from "react";
import {Loader} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {setUserAction} from "../../redux/reducers/persist/set-user.js";
import {setAuthTokenAction} from "../../redux/reducers/persist/set-auth-token.js";
import {connect} from "react-redux";

class LogoutPage extends React.Component {
    componentDidMount() {
        this.logout();
    }

    logout = async () => {
        const {setAuthToken, setLoggedInUser, history} = this.props;
        setAuthToken(null);
        setLoggedInUser(null);
        history.push("/");
    };

    render() {
        return <Loader active content={"Logger ud..."} />
    }
}


LogoutPage.propTypes = {
    setLoggedInUser: PropTypes.func.isRequired,
    setAuthToken: PropTypes.func.isRequired,
};

const dispatchToProps = (dispatch) => ({
    setLoggedInUser: (user) => dispatch(setUserAction(user)),
    setAuthToken: (authToken) => dispatch(setAuthTokenAction(authToken)),
});

export default withRouter(connect(null, dispatchToProps)(LogoutPage));