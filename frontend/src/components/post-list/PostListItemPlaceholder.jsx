import React from "react";
import PropTypes from "prop-types";
import {Placeholder, Segment} from "semantic-ui-react";

class PostListItemPlaceholder extends React.Component {
    render() {
        return <Segment>
            <Placeholder fluid>
                <Placeholder.Header>
                    <Placeholder.Line/>
                </Placeholder.Header>
                <Placeholder.Paragraph>
                    <Placeholder.Line length={"full"} />
                    <Placeholder.Line length={"full"} />
                    <Placeholder.Line />
                </Placeholder.Paragraph>
            </Placeholder>
        </Segment>
    }
}

export default PostListItemPlaceholder;