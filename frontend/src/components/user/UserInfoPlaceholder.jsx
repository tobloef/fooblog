import React from "react";
import PropTypes from "prop-types";
import {Placeholder} from "semantic-ui-react";

class UserInfoPlaceholder extends React.Component {
    render() {
        return <Placeholder fluid>
            <Placeholder.Header>
                <Placeholder.Line/>
            </Placeholder.Header>
            <Placeholder.Paragraph>
                <Placeholder.Line/>
            </Placeholder.Paragraph>
        </Placeholder>
    }
}

export default UserInfoPlaceholder;