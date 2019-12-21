import React from "react";
import WritePostPage from "./WritePostPage.jsx";
import {withRouter} from "react-router-dom";
import gql from "graphql-tag";
import useGenericAsync from "../../use-generic-async.js";
import { graphql } from "../../graphql/graphql.js";

const CREATE_POST = gql`
    mutation CreatePost($title: String!, $content: String!) {
        createPost(title: $title, content: $content) {
            urlSlug
            author {
                username
            }
        }
    }
`;

const WritePostPageContainer = ({
    history
}) => {
    const [
        submitting,
        errorMessage,
        createPost
    ] = useGenericAsync(async (title, content) => {
        const {data: {createPost: post}} = await graphql.mutate({
            mutation: CREATE_POST,
            variables: {
                title,
                content,
            }
        });
        history.push(`/@${post.author.username}/${post.urlSlug}`);
    }, "Error submitting post.");

    return <WritePostPage
        errorMessage={errorMessage}
        onSubmit={createPost}
        submitting={submitting}
    />
};

export default withRouter(WritePostPageContainer);