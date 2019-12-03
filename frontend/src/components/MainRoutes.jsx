import React from "react";
import {Route, Switch} from "react-router-dom";
import NotFoundPage from "./not-found/NotFoundPage.jsx";
import UserPageContainer from "./user/UserPageContainer.jsx";
import PostPageContainer from "./post/PostPageContainer.jsx";
import WritePostPageContainer from "./write-post/WritePostPageContainer.jsx";
import LoginPage from "./login/LoginPage.jsx";
import LogoutPage from "./logout/LogoutPage.jsx";
import FrontPage from "./front-page/FrontPage.jsx";
import RegisterPageContainer from "./register/RegisterPageContainer.jsx";

class MainRoutes extends React.Component {
    render() {
        return <Switch>
            <Route exact path={"/"} component={FrontPage} />
            <Route exact path={"/@:username"} component={UserPageContainer} />
            <Route exact path={"/@:username/:urlSlug"} component={PostPageContainer} />
            <Route exact path={"/write-post"} component={WritePostPageContainer} />
            <Route exact path={"/register"} component={RegisterPageContainer} />
            <Route exact path={"/login"} component={LoginPage} />
            <Route exact path={"/logout"} component={LogoutPage} />
            <Route component={NotFoundPage} />
        </Switch>
    }
}

export default MainRoutes;