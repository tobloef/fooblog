import React from "react";
import { Header } from "semantic-ui-react";
import UserPostListContainer from "../post-list/PostListContainer.jsx";
import PropTypes from "prop-types";

const UserPage = ({
    username,
    loading,
}) => {
    return <div style={{
        display: "flex",
        flexDirection: "column",
    }}>
        <Header content={`Posts by @${username}`} />
        <UserPostListContainer
            username={username}
            loading={loading}
        />
    </div>
};

UserPage.propTypes = {
    username: PropTypes.string.isRequired,
    loading: PropTypes.bool,
};

export default UserPage;