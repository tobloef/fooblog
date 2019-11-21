import React from "react";
import PropTypes from "prop-types";
import PostListItemPlaceholder from "./PostListItemPlaceholder.jsx";
import PostListItem from "./PostListItem.jsx";

class PostList extends React.Component {
    getPostItems = (posts, postCount, showPlaceholders) => {
        posts = posts || [];
        let postItems = [];
        for (let i = 0; i < postCount; i++) {
            if (posts[i] == null) {
                if (showPlaceholders) {
                    postItems.push(<PostListItemPlaceholder key={`post_${i}`}/>);
                }
                continue;
            }
            postItems.push(<PostListItem
                key={`post_${i}`}
                title={posts[i].title}
                content={posts[i].content}
                datePosted={posts[i].datePosted}
                author={posts[i].author}
                urlSlug={posts[i].urlSlug}
            />);
        }
        return postItems;
    };

    render() {
        const {
            posts,
            postCount,
            showPlaceholders
        } = this.props;

        return <div>{this.getPostItems(posts, postCount, showPlaceholders)}</div>
    }
}

PostList.propTypes = {
    posts: PropTypes.array,
    postCount: PropTypes.number,
    showPlaceholders: PropTypes.bool,
};

export default PostList;