import React from "react";
import {Container, Icon, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const getAnonymousItems = () => [
    {content: "Log in", to: "/login"},
    {content: "Register", to: "/register"},
];
const getLoggedInItems = (user) => [
    {content: "My profile", to: `/@${user.username}`},
    {content: "Write post", to: "/write-post"},
    {content: "Log out", to: "/logout"},
];
const getRightMenuItemElements = (user) => {
    const menuItems = user ? getLoggedInItems(user) : getAnonymousItems();
    return menuItems.map((item, i) => {
        return <Menu.Item
            key={i}
            as={Link}
            {...item}
        />;
    });

};

const NavMenu = ({user}) => (
    <Menu
        fixed={"top"}
        borderless={true}
    >
        <Container>
            <Menu.Item
                as={Link}
                to={"/"}
                header
            >
                <Icon
                    name={"file alternate"}
                    size={"big"}
                />
                FooBlog
            </Menu.Item>
            <Menu.Item
                as={Link}
                to={"/"}
                content={"All posts"}
            />
            <Menu.Item
                as={"a"}
                href={"https://github.com/tobloef/exploring-backends"}
                content={"GitHub"}
            />
            <Menu.Menu
                position={"right"}
            >
                {getRightMenuItemElements(user)}
            </Menu.Menu>
        </Container>
    </Menu>
);

NavMenu.propTypes = {
    user: PropTypes.object
};

const stateToProps = (state) => ({
    user: state.persist.user,
});

export default connect(stateToProps)(NavMenu);