import React from "react";
import {Header} from "semantic-ui-react";
import PostListContainer from "../post-list/PostListContainer.jsx";

const FrontPage = () => (
    <div style={{
        display: "flex",
        flexDirection: "column",
    }}>
        <Header content={"Latest Posts"} />
        <PostListContainer/>
    </div>
);

export default FrontPage;