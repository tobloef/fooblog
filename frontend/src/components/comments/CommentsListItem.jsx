import React from "react";
import PropTypes from "prop-types";
import {Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import Truncate from "react-truncate";
import Byline from "../Byline.jsx";

class CommentsListItem extends React.Component {
    render() {
        const {
            authorUsername,
            content,
            datePosted
        } = this.props;

        return <Segment
            style={{
                display: "block",
                color: "black"
            }}
        >
            <p>{content}</p>
            <p><Byline datePosted={datePosted} authorUsername={authorUsername}/></p>
        </Segment>
    }
}

CommentsListItem.propTypes = {
    content: PropTypes.string.isRequired,
    authorUsername: PropTypes.string.isRequired,
    datePosted: PropTypes.any.isRequired,
};

export default CommentsListItem;