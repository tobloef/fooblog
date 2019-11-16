import React from "react";
import {Header} from "semantic-ui-react";
import PostListContainer from "../post-list/PostListContainer.jsx";

class FrontPage extends React.Component {
    render() {
        return <div style={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Header
                content={"Latest Posts"}
            />
            <PostListContainer/>
        </div>
    }
}

export default FrontPage;