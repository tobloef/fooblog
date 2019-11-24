import React from "react";
import PostList from "./PostList.jsx";
import {Button, Message} from "semantic-ui-react";
import PropTypes from "prop-types";
import {fetchPost, fetchPosts, fetchUserPosts} from "../../api.js";

class PostListContainer extends React.Component {
    POSTS_TO_LOAD = 10;

    state = {
        posts: null,
        postCount: this.POSTS_TO_LOAD,
        loadingPosts: false,
        oldestDateLoaded: null,
        errorMessage: null,
        noMorePosts: false,
    };

    componentDidMount() {
        if (this.props.posts != null) {
            this.setState({posts: this.props.posts});
            return;
        }
        // noinspection JSIgnoredPromiseFromCall
        this.loadPosts();
    }

    loadPosts = async () => {
        let {
            postCount,
            oldestDateLoaded,
            posts,
            noMorePosts,
        } = this.state;
        const {
            username,
        } = this.props;

        this.setState({
            loadingPosts: true,
            postCount: postCount + this.POSTS_TO_LOAD
        });
        try {
            let newPosts;
            if (username != null) {
                newPosts = await fetchUserPosts(username, oldestDateLoaded, this.POSTS_TO_LOAD);
            } else {
                newPosts = await fetchPosts(oldestDateLoaded, this.POSTS_TO_LOAD);
            }
            if (newPosts == null) {
                throw new Error("New posts is null.");
            }
            if (newPosts.length < this.POSTS_TO_LOAD) {
                noMorePosts = true;
            }
            oldestDateLoaded = newPosts.reduce((oldest, post) => {
                if (oldestDateLoaded == null || oldest > post.datePosted) {
                    oldest = post.datePosted;
                }
                return oldest;
            }, oldestDateLoaded);
            this.setState({
                posts: [
                    ...(posts || []),
                    ...newPosts,
                ],
                noMorePosts,
                oldestDateLoaded
            });
        } catch (error) {
            console.error("Error fetching posts.", error);
            let errorMessage = "An error occurred.";
            this.setState({errorMessage});
        } finally {
            this.setState({loadingPosts: false});
        }
    };

    render() {
        const {
            posts,
            loadingPosts,
            noMorePosts,
            postCount,
            errorMessage
        } = this.state;
        const {
            loading
        } = this.props;

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
                onClick={this.loadPosts}
                disabled={noMorePosts}
                loading={loadingPosts}
                style={{
                    marginTop: "20px"
                }}
            />
        </>
    }
}

PostListContainer.propTypes = {
    username: PropTypes.string,
    loading: PropTypes.bool,
};

export default PostListContainer;