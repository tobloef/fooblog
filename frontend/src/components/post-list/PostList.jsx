import React from "react";
import PropTypes from "prop-types";
import PostListItemPlaceholder from "./PostListItemPlaceholder.jsx";
import PostListItem from "./PostListItem.jsx";

const PostList = ({
    posts,
    postCount,
    showPlaceholders,
}) => {
    const getPostItems = (posts, postCount, showPlaceholders) => {
        posts = posts || [];
        let postItems = [];
        for (let i = 0; i < postCount; i++) {
            if (posts[i] == null) {
                if (showPlaceholders) {
                    postItems.push(<PostListItemPlaceholder key={i}/>);
                }
                continue;
            }
            postItems.push(<PostListItem
                key={i}
                title={posts[i].title}
                content={posts[i].content}
                datePosted={posts[i].datePosted}
                author={posts[i].author}
                urlSlug={posts[i].urlSlug}
                commentCount={posts[i].commentCount}
            />);
        }
        return postItems;
    };

    if (posts == null || posts.length === 0) {
        return <p style={{
            color: "grey",
            textAlign: "center",
        }}>No posts was found.</p>
    }

    return <div>{getPostItems(posts, postCount, showPlaceholders)}</div>
};

PostList.propTypes = {
    posts: PropTypes.array,
    postCount: PropTypes.number,
    showPlaceholders: PropTypes.bool,
};

export default PostList;