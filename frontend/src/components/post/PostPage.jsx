import React from "react";
import {Divider, Header} from "semantic-ui-react";
import PropTypes from "prop-types";
import Byline from "../Byline.jsx";
import CommentsListContainer from "../comments/CommentsListContainer.jsx";

class PostPage extends React.Component {
    render() {
        const {
            title,
            content,
            datePosted,
            author,
            urlSlug,
            user
        } = this.props;

        return <div>
            <Header as={"h1"}>
                {title}
                <Header.Subheader>
                    <Byline datePosted={datePosted} authorUsername={author.username} />
                </Header.Subheader>
            </Header>
            <p style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word"
            }}>{content}</p>
            <Divider/>
            <CommentsListContainer
                authorUsername={author.username}
                postUrlSlug={urlSlug}
                user={user}
            />
        </div>
    }
}

PostPage.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    datePosted: PropTypes.any.isRequired,
    author: PropTypes.object.isRequired,
    urlSlug: PropTypes.string.isRequired,
    user: PropTypes.object,
};

export default PostPage;