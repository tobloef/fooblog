import React from "react";
import PropTypes from "prop-types";
import PostListItemPlaceholder from "../post-list/PostListItemPlaceholder.jsx";
import CommentsListItem from "./CommentsListItem.jsx";

const CommentsList = ({
    loading,
    comments,
}) => {
    if (loading) {
        const placeholders = [];
        for (let i = 0; i < 3; i++) {
            placeholders.push(<PostListItemPlaceholder key={i}/>);
        }
        return <>
            {placeholders}
        </>
    }

    if (comments == null || comments.length === 0) {
        return <p style={{
            color: "grey",
            textAlign: "center",
        }}>No comments for this post.</p>
    }

    return <>
        {
            comments.map((comment, i) => {
                return <CommentsListItem
                    key={i}
                    content={comment.content}
                    authorUsername={comment.author.username}
                    datePosted={comment.datePosted}
                />
            })
        }
    </>
};

CommentsList.propTypes = {
    loading: PropTypes.bool,
    comments: PropTypes.array
};

export default CommentsList;