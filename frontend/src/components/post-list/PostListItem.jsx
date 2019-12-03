import React from "react";
import PropTypes from "prop-types";
import { Header, Segment } from "semantic-ui-react";
import Truncate from 'react-truncate';
import Byline from "../Byline.jsx";
import { Link } from "react-router-dom";


const PostListItem = ({
    urlSlug,
    title,
    content,
    datePosted,
    author,
    commentCount,
}) => {
    const postLinkPath = `/@${author.username}/${urlSlug}`;

    return <Segment
        as={Link}
        to={postLinkPath}
        style={{
            display: "block",
            color: "black",
        }}
    >
        <Header>{title}</Header>
        <p>
            <Truncate
                lines={3}
                ellipsis={<span>... <Link to={postLinkPath}>Read more</Link></span>}
            >{content}</Truncate>
        </p>
        <p><Byline datePosted={datePosted} authorUsername={author.username}/></p>
        <p>{commentCount || 0} comments</p>
    </Segment>
};

PostListItem.propTypes = {
    urlSlug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    datePosted: PropTypes.any.isRequired,
    author: PropTypes.object.isRequired,
};

export default PostListItem;