import React from "react";
import {Header} from "semantic-ui-react";
import PostListContainer from "../post-list/PostListContainer.jsx";
import PropTypes from "prop-types";

class UserPage extends React.Component {
    render() {
        const {username, posts, loading} = this.props;

        return <div style={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Header
                content={`Posts by @${username}`}
            />
            <PostListContainer
                username={username}
                posts={posts}
                loading={loading}
            />
        </div>
    }
}

UserPage.propTypes = {
    username: PropTypes.string.isRequired,
    posts: PropTypes.array,
    loading: PropTypes.bool
};

export default UserPage;