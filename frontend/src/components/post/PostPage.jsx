import React from "react";
import {Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import Byline from "../Byline.jsx";

class PostPage extends React.Component {
    render() {
        const {
            title,
            content,
            datePosted,
            author
        } = this.props;

        return <div>
            <Header as={"h1"}>
                {title}
                <Header.Subheader>
                    <Byline datePosted={datePosted} author={author} />
                </Header.Subheader>
            </Header>
            <p style={{
                whiteSpace: "pre-line",
            }}>{content}</p>
        </div>
    }
}

PostPage.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    datePosted: PropTypes.any.isRequired,
    author: PropTypes.object.isRequired,
};

export default PostPage;