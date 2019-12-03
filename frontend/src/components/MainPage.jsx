import React from "react";
import {Container} from "semantic-ui-react";
import MainRoutes from "./MainRoutes.jsx";
import NavMenu from "./NavMenu.jsx";

class MainPage extends React.Component {
    render() {
        return <div>
            <NavMenu />
            <Container text style={{
                marginTop: "5em",
                paddingBottom: "2em",
            }}>
                <MainRoutes/>
            </Container>
        </div>
    }
}

export default MainPage;