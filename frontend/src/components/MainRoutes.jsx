import React from "react";
import {Route, Switch} from "react-router-dom";
import NotFoundPage from "./not-found/NotFoundPage.jsx";
import UserPageContainer from "./user/UserPageContainer.jsx";
import PostPageContainer from "./post/PostPageContainer.jsx";
import WritePostPageContainer from "./write-post/WritePostPageContainer.jsx";
import LoginPageContainer from "./login/LoginPageContainer.jsx";
import LogoutPage from "./logout/LogoutPage.jsx";
import FrontPage from "./front-page/FrontPage.jsx";
import RegisterPageContainer from "./register/RegisterPageContainer.jsx";
import PropTypes from "prop-types";

class MainRoutes extends React.Component {
    render() {
        const {
            setLoggedInUser,
            user
        } = this.props;

        return <Switch>
            <Route exact path={"/"} component={FrontPage} />
            <Route exact path={"/@:username"} component={UserPageContainer} />
            <Route exact path={"/@:username/:urlSlug"} render={(props) => {
                return <PostPageContainer {...props} user={user}/>
            }} />
            <Route exact path={"/write-post"} component={WritePostPageContainer} />
            <Route exact path={"/register"} render={(props) => {
                return <RegisterPageContainer {...props} user={user} />
            }} />
            <Route exact path={"/login"} render={(props) => {
                return <LoginPageContainer {...props} setLoggedInUser={setLoggedInUser} user={user} />;
            }} />
            <Route exact path={"/logout"} render={(props) => {
                return <LogoutPage {...props} setLoggedInUser={setLoggedInUser} />;
            }} />
            <Route component={NotFoundPage} />
        </Switch>
    }
}

MainRoutes.propTypes = {
    setLoggedInUser: PropTypes.func,
};

export default MainRoutes;