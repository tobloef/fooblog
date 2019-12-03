import React from "react";
import WritePostPage from "./WritePostPage.jsx";
import * as api from "../../api.js";
import {withRouter} from "react-router-dom";
import useGenericAsync from "../../use-generic-async.js";

const WritePostPageContainer = ({
    history
}) => {
    const [
        submitting,
        errorMessage,
        createPost
    ] = useGenericAsync(async (title, content) => {
        const post = await api.createPost(title, content);
        history.push(`/@${post.author.username}/${post.urlSlug}`);
    }, "Error submitting post.");

    return <WritePostPage
        errorMessage={errorMessage}
        onSubmit={createPost}
        submitting={submitting}
    />
};

export default withRouter(WritePostPageContainer);