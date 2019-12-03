import React, { useEffect, useState } from "react";
import PostList from "./PostList.jsx";
import {Button, Message} from "semantic-ui-react";
import PropTypes from "prop-types";
import * as api from "../../api.js";
import useGenericAsync from "../../use-generic-async.js";

const POSTS_TO_LOAD = 10;

const PostListContainer = ({
    username,
    loading
}) => {
    const [posts, setPosts] = useState(null);
    const [postCount, setPostCount] = useState(POSTS_TO_LOAD);
    const [oldestDateLoaded, setOldestDateLoaded] = useState(null);
    const [noMorePosts, setNoMorePosts] = useState(false);

    const [
        loadingPosts,
        errorMessage,
        fetchPosts
    ] = useGenericAsync(async () => {
        setPostCount(postCount + POSTS_TO_LOAD);
        let newPosts;
        if (username != null) {
            newPosts = await api.fetchUserPosts(username, oldestDateLoaded, POSTS_TO_LOAD);
        } else {
            newPosts = await api.fetchPosts(oldestDateLoaded, POSTS_TO_LOAD);
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

    useEffect(fetchPosts, [username]);

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
            onClick={fetchPosts}
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