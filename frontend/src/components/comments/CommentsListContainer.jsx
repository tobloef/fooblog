import React from "react";
import PropTypes from "prop-types";
import {createComment, fetchPostComments} from "../../api.js";
import {Dimmer, Divider, Header, Loader, Message, TextArea} from "semantic-ui-react";
import CommentsList from "./CommentsList.jsx";
import CommentForm from "./CommentForm.jsx";

class CommentsListContainer extends React.Component {
    state = {
        comments: null,
        fetchCommentsLoading: false,
        submitCommentLoading: false,
        fetchCommentsErrorMessage: null,
        submitCommentErrorMessage: null,
    };

    componentDidMount() {
        if (this.props.comments != null) {
            this.setState({comments: this.props.comments});
            return;
        }
        // noinspection JSIgnoredPromiseFromCall
        this.loadComments();
    }

    loadComments = async () => {
        const {
            authorUsername,
            postUrlSlug
        } = this.props;

        this.setState({
            fetchCommentsLoading: true,
        });
        try {
            const comments = await fetchPostComments(authorUsername, postUrlSlug);
            if (comments == null) {
                throw new Error("Fetched comments are null.");
            }
            this.setState({
                comments,
            });
        } catch (error) {
            console.error("Error fetching comments.", error);
            this.setState({
                fetchCommentsErrorMessage: error.statusText || "An error occurred."
            });
        } finally {
            this.setState({fetchCommentsLoading: false});
        }
    };

    submitComment = async (commentContent) => {
        const {
            authorUsername,
            postUrlSlug
        } = this.props;
        const {
            comments
        } = this.state;

        this.setState({
            submitCommentLoading: true,
        });
        try {
            const comment = await createComment(authorUsername, postUrlSlug, commentContent);
            this.setState({
                comments: [
                    comment,
                    ...comments
                ]
            })
        } catch (error) {
            console.error("Error submitting comment.", error);
            this.setState({
                submitCommentErrorMessage: error.statusText || "An error occurred."
            });
        } finally {
            this.setState({submitCommentLoading: false});
        }
    };

    render() {
        const {
            submitCommentLoading,
            fetchCommentsLoading,
            submitCommentErrorMessage,
            fetchCommentsErrorMessage,
            comments,
        } = this.state;
        const {
            user
        } = this.props;

        return <div>
            <Header
                content={"Comments"}
           e />
            {
                user != null && <>
                    {
                        submitCommentErrorMessage != null &&
                        <Message
                            error
                            header={"Couldn't submit comment"}
                            content={submitCommentErrorMessage}
                            style={{
                                marginTop: "0px"
                            }}
                        />
                    }
                    <CommentForm
                        onSubmit={this.submitComment}
                        loading={submitCommentLoading}
                    />
                    <Divider/>
                </>
            }
            {(() => {
                if (fetchCommentsErrorMessage != null) {
                    return <Message
                        error
                        header={"Couldn't load comments"}
                        content={fetchCommentsErrorMessage}
                        style={{
                            marginTop: "0px"
                        }}
                    />
                }
                return <CommentsList
                    comments={comments}
                    loading={fetchCommentsLoading}
                />
            })()}
        </div>
    }
}

CommentsListContainer.propTypes = {
    postUrlSlug: PropTypes.string.isRequired,
    authorUsername: PropTypes.string.isRequired,
    user: PropTypes.object
};

export default CommentsListContainer;