import React, { useEffect, useState } from "react";
import PostPage from "./PostPage.jsx";
import {withRouter} from "react-router-dom";
import {Message} from "semantic-ui-react";
import PostPagePlaceholder from "./PostPagePlaceholder.jsx";
import useGenericAsync from "../../use-generic-async.js";
import * as api from "../../api.js";

const PostPageContainer = ({
    match,
}) => {
    const [post, setPost] = useState(null);
    const {username, urlSlug} = match.params;

    const [
        loading,
        errorMessage,
        fetchPost,
    ] = useGenericAsync(async () => {
        const post = await api.fetchPost(username, urlSlug);
        setPost(post);
    }, "Error fetching post.");

    useEffect(fetchPost, [username, urlSlug]);

    if (loading) {
        return <PostPagePlaceholder />
    }
    if (post == null || errorMessage) {
        return <Message
            error
            header={"Couldn't load the post"}
            content={errorMessage}
        />
    }

    return <PostPage
        title={post.title}
        content={post.content}
        datePosted={post.datePosted}
        author={post.author}
        urlSlug={post.urlSlug}
    />
};

export default withRouter(PostPageContainer);