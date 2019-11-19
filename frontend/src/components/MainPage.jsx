import React from "react";
import {Container} from "semantic-ui-react";
import MainRoutes from "./MainRoutes.jsx";
import NavMenu from "./NavMenu.jsx";
import PropTypes from "prop-types";

class MainPage extends React.Component {
    render() {
        const {
            user,
            setLoggedInUser
        } = this.props;

        return <div>
            <NavMenu user={user} />
            <Container text style={{
                marginTop: "5em",
                paddingBottom: "2em",
            }}>
                <MainRoutes
                    setLoggedInUser={setLoggedInUser}
                    user={user}
                />
            </Container>
        </div>
    }
}

MainPage.propTypes = {
    user: PropTypes.object,
    setLoggedInUser: PropTypes.func,
};

export default MainPage;