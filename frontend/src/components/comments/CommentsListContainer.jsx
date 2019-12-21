import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Divider, Header, Message } from "semantic-ui-react";
import CommentsList from "./CommentsList.jsx";
import CommentForm from "./CommentForm.jsx";
import { connect } from "react-redux";
import useGenericAsync from "../../use-generic-async.js";
import gql from "graphql-tag";
import { graphql } from "../../graphql/graphql.js";

const CREATE_COMMENT = gql`
    mutation CreateComment($username: String!, $postUrlSlug: String!, $content: String!) {
        createComment(username: $username, postUrlSlug: $postUrlSlug, content: $content) {
            author {
                username
            }
            content
            datePosted
        }
    }
`;

const GET_POST_COMMENTS = gql`
    query GetPostComments($username: String!, $urlSlug: String!) {
        post(username: $username, urlSlug: $urlSlug) {
            comments {
                content
                author {
                    username
                }
                datePosted
            }
        }
    }
`;

const CommentsListContainer = ({
   authorUsername,
   postUrlSlug,
   user,
}) => {
    const [ comments, setComments ] = useState(null);

    const [
        submitCommentLoading,
        submitCommentErrorMessage,
        submitComment
    ] = useGenericAsync(async (content) => {
        const {data: {createComment: comment}} = await graphql.mutate({
            mutation: CREATE_COMMENT,
            variables: {
                username: authorUsername,
                postUrlSlug,
                content,
            }
        });
        setComments([comment, ...comments]);
    }, "Error submitting comment.");

    const [
        fetchCommentsLoading,
        fetchCommentsErrorMessage,
        fetchComments
    ] = useGenericAsync(async () => {

        const {data: {post: {comments}}} = await graphql.mutate({
            mutation: GET_POST_COMMENTS,
            variables: {
                username: authorUsername,
                urlSlug: postUrlSlug,
            }
        });
        if (comments == null) {
            throw new Error("Fetched comments are null.");
        }
        setComments(comments);
    }, "Error fetching comments.");

    useEffect(fetchComments, [postUrlSlug, authorUsername]);

    return (
        <>
            <Header content={"Comments"}/>
            {
                user != null && <>
                    {
                        submitCommentErrorMessage != null && <Message
                            error
                            header={"Couldn't submit comment"}
                            content={submitCommentErrorMessage}
                            style={{
                                marginTop: "0px"
                            }}
                        />
                    }
                    <CommentForm
                        onSubmit={submitComment}
                        loading={submitCommentLoading}
                    />
                    <Divider/>
                </>
            }
            {
                fetchCommentsErrorMessage != null && <Message
                    error
                    header={"Couldn't load comments"}
                    content={fetchCommentsErrorMessage}
                    style={{
                        marginTop: "0px"
                    }}
                />
            }
            {
                fetchCommentsErrorMessage == null && <CommentsList
                    comments={comments}
                    loading={fetchCommentsLoading}
                />
            }
        </>
    );
};

CommentsListContainer.propTypes = {
    postUrlSlug: PropTypes.string.isRequired,
    authorUsername: PropTypes.string.isRequired,
    user: PropTypes.object
};

const stateToProps = (state) => ({
    user: state.persist.user,
});

export default connect(stateToProps)(CommentsListContainer);