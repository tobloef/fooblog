import React from "react";
import {Container, Icon, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

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
                    {this.getRightMenuItems()}
                </Menu.Menu>
            </Container>
        </Menu>
    }
}

NavMenu.propTypes = {
    user: PropTypes.object
};

const stateToProps = (state) => {
    return ({
        user: state.persist.user,
    });
};

export default connect(stateToProps)(NavMenu);