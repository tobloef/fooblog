import React, { useEffect, useState } from "react";
import PostList from "./PostList.jsx";
import {Button, Message} from "semantic-ui-react";
import PropTypes from "prop-types";
import useGenericAsync from "../../use-generic-async.js";
import { graphql } from "../../graphql/graphql.js";
import gql from "graphql-tag";

const POSTS_TO_LOAD = 10;
const GET_POST_PREVIEWS = gql`
    query GetPostPreviews($maxDate: GraphQLDateTime, $limit: Int) {
        posts(maxDate: $maxDate, limit: $limit) {
            title
            content
            datePosted
            author {
                username
            }
            urlSlug
            commentCount
        }
    }
`;
const GET_USER_POST_PREVIEWS = gql`
    query GetUserPostPreviews($username: String!, $maxDate: GraphQLDateTime, $limit: Int) {
        user(username: $username) {
            posts(maxDate: $maxDate, limit: $limit) {
                title
                content
                datePosted
                author {
                    username
                }
                urlSlug
                commentCount
            }
        }
    }
`;

const PostListContainer = ({
    username,
    loading,
}) => {
    const [posts, setPosts] = useState(null);
    const [postCount, setPostCount] = useState(POSTS_TO_LOAD);
    const [oldestDateLoaded, setOldestDateLoaded] = useState(null);
    const [noMorePosts, setNoMorePosts] = useState(false);

    const [
        loadingPosts,
        errorMessage,
        fetchPostPreviews
    ] = useGenericAsync(async () => {
        setPostCount(postCount + POSTS_TO_LOAD);
        let newPosts;
        if (username != null) {
            const response = await graphql.mutate({
                mutation: GET_USER_POST_PREVIEWS,
                variables: {
                    username,
                    maxDate: oldestDateLoaded,
                    limit: POSTS_TO_LOAD,
                }
            });
            newPosts = response.data.user.posts;
        } else {
            const response = await graphql.mutate({
                mutation: GET_POST_PREVIEWS,
                variables: {
                    maxDate: oldestDateLoaded,
                    limit: POSTS_TO_LOAD,
                }
            });
            newPosts = response.data.posts;
        }
        if (newPosts.length < POSTS_TO_LOAD) {
            setNoMorePosts(true);
        }
        const newOldestDateLoaded = newPosts.reduce((oldest, post) => {
            if (oldestDateLoaded == null || oldest < post.datePosted) {
                oldest = post.datePosted;
            }
            return oldest;
        }, oldestDateLoaded);
        setOldestDateLoaded(newOldestDateLoaded);
        setPosts([
            ...(posts || []),
            ...newPosts,
        ]);
    }, "Error fetching posts");

    useEffect(fetchPostPreviews, [username]);

    if (errorMessage != null) {
        return <Message
            error
            header={"Couldn't load posts"}
            content={errorMessage}
            style={{
                marginTop: "0px"
            }}
        />
    }

    return <>
        <PostList
            posts={posts}
            postCount={postCount}
            showPlaceholders={loading || loadingPosts}
        />
        <Button
            content={noMorePosts ? "No older posts" : "Load older posts"}
            onClick={fetchPostPreviews}
            disabled={noMorePosts}
            loading={loadingPosts}
            style={{
                marginTop: "20px"
            }}
        />
    </>
};

PostListContainer.propTypes = {
    username: PropTypes.string,
    loading: PropTypes.bool,
};

export default PostListContainer;