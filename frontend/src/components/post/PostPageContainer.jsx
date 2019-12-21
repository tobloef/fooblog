import React, { useEffect, useState } from "react";
import PostPage from "./PostPage.jsx";
import {withRouter} from "react-router-dom";
import {Message} from "semantic-ui-react";
import PostPagePlaceholder from "./PostPagePlaceholder.jsx";
import useGenericAsync from "../../use-generic-async.js";
import {graphql} from "../../graphql/graphql.js";
import gql from "graphql-tag";

const GET_POST = gql`
    query GetPost($username: String!, $urlSlug: String!) {
        post(username: $username, urlSlug: $urlSlug) {
            title
            content
            author {
                username
            }
            urlSlug
            datePosted
        }
    }
`;
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
        const {data: {post}} = await graphql.mutate({
            mutation: GET_POST,
            variables: {
                username,
                urlSlug
            }
        });
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