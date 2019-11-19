import React from "react";
import {Container, Icon, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

class NavMenu extends React.Component {
    getRightMenuItems = () => {
        const {user} = this.props;

        if (user == null) {
            return <>
                <Menu.Item
                    as={Link}
                    to={"/login"}
                    content={"Log in"}
                />
                <Menu.Item
                    as={Link}
                    to={"/register"}
                    content={"Register"}
                />
            </>
        }
        return <>
            <Menu.Item
                as={Link}
                to={`/@${user.username}`}
                content={"My profile"}
            />
            <Menu.Item
                as={Link}
                to={"/write-post"}
                content={"Write post"}
            />
            <Menu.Item
                as={Link}
                to={"/logout"}
                content={"Log out"}
            />
        </>
     };


    render() {
        return <Menu
            fixed={"top"}
            borderless={true}
            stackable={true}
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
                    content={"Home"}
                />
                <Menu.Menu
                    position={"right"}
                >
                    {this.getRightMenuItems()}
                </Menu.Menu>
            </Container>
        </Menu>
    }
}

NavMenu.propTypes = {
    user: PropTypes.object
};

export default NavMenu;