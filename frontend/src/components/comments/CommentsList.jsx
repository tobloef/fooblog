import React from "react";
import PropTypes from "prop-types";
import PostListItemPlaceholder from "../post-list/PostListItemPlaceholder.jsx";
import CommentsListItem from "./CommentsListItem.jsx";

class CommentsList extends React.Component {
    render() {
        const {
            loading,
            comments,
        } = this.props;

        if (loading) {
            const placeholders = [];
            for (let i = 0; i < 3; i++) {
                placeholders.push(<PostListItemPlaceholder key={`placeholder_${i}`}/>);
            }
            return <div>
                {placeholders}
            </div>
        }

        if (comments == null || comments.length === 0) {
            return <p style={{
                color: "grey",
                textAlign: "center",
            }}>No comments for this post.</p>
        }

        return <div>
            {
                comments.map((comment, i) => {
                    return <CommentsListItem
                        key={`comment_${i}`}
                        content={comment.content}
                        authorUsername={comment.author.username}
                        datePosted={comment.datePosted}
                    />
                })
            }
        </div>
    }
}

CommentsList.propTypes = {
    loading: PropTypes.bool,
    comments: PropTypes.array
};

export default CommentsList;