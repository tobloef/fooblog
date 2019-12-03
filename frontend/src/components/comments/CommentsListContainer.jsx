import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Divider, Header, Message } from "semantic-ui-react";
import CommentsList from "./CommentsList.jsx";
import CommentForm from "./CommentForm.jsx";
import { connect } from "react-redux";
import useGenericAsync from "../../use-generic-async.js";
import * as api from "../../api.js";

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
    ] = useGenericAsync(async (commentContent) => {
        const comment = await api.createComment(authorUsername, postUrlSlug, commentContent);
        setComments([comment, ...comments]);
    }, "Error submitting comment.");

    const [
        fetchCommentsLoading,
        fetchCommentsErrorMessage,
        fetchComments
    ] = useGenericAsync(async () => {
        const comments = await api.fetchPostComments(authorUsername, postUrlSlug);
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