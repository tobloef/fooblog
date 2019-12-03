import React from "react";
import UserPage from "./UserPage.jsx";
import {Message} from "semantic-ui-react";
import {fetchUser} from "../../api.js";
import {withRouter} from "react-router-dom";

class UserPageContainer extends React.Component {
    state = {
        user: null,
        loading: false,
        errorMessage: null,
    };
    
    componentDidMount() {
        const {match} = this.props;
        const {username} = match.params;
        this.fetchUser(username);
    }

    fetchUser = async (username) => {
        this.setState({loading: true, errorMessage: null});
        try {
            const user = await fetchUser(username);
            this.setState({user});
        } catch (error) {
            console.error("Error fetching user.", error);
            this.setState({errorMessage: error.statusText || "An error occurred."});
        } finally {
            this.setState({loading: false});
        }
    };

    render() {
        const {user, errorMessage, loading} = this.state;
        const {match} = this.props;
        const {username} = match.params;

        if (errorMessage) {
            return <Message
                error
                header={"Couldn't load user"}
                text={errorMessage}
            />
        }

        return <UserPage
            username={username}
            posts={(user || {}).posts}
            loading={loading}
        />
    }
}

export default withRouter(UserPageContainer);