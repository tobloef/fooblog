import React from "react";
import {Loader} from "semantic-ui-react";
import {setAuthToken} from "../../api.js";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";

class LogoutPage extends React.Component {
    componentDidMount() {
        this.logout();
    }

    logout = async () => {
        const {setLoggedInUser, history} = this.props;
        setAuthToken(null);
        setLoggedInUser(null);
        history.push("/");
    };

    render() {
        return <Loader active content={"Logger ud..."} />
    }
}

LogoutPage.propTypes = {
    setLoggedInUser: PropTypes.func,
};

export default withRouter(LogoutPage);