import React from "react";
import {Container} from "semantic-ui-react";
import MainRoutes from "./MainRoutes.jsx";
import NavMenu from "./NavMenu.jsx";

const MainPage = () => (
    <>
        <NavMenu/>
        <Container
            text
            style={{
                marginTop: "5em",
                paddingBottom: "2em",
            }}
        >
            <MainRoutes/>
        </Container>
    </>
);

export default MainPage;