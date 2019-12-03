import React, { useEffect } from "react";
import {Loader} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setAuthTokenAction, setUserAction} from "../../redux/persist.js";

const LogoutPage = ({
    setAuthToken,
    setLoggedInUser,
    history,
}) => {
    useEffect(() => {
        setAuthToken(null);
        setLoggedInUser(null);
        history.push("/");
    }, [setAuthToken, setLoggedInUser, history]);

    return <Loader active content={"Logger ud..."} />
};

LogoutPage.propTypes = {
    setLoggedInUser: PropTypes.func.isRequired,
    setAuthToken: PropTypes.func.isRequired,
};

const dispatchToProps = (dispatch) => ({
    setLoggedInUser: (user) => dispatch(setUserAction(user)),
    setAuthToken: (authToken) => dispatch(setAuthTokenAction(authToken)),
});

export default withRouter(connect(null, dispatchToProps)(LogoutPage));