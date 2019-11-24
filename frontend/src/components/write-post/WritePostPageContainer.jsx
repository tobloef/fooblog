import React from "react";
import WritePostPage from "./WritePostPage.jsx";
import {createPost} from "../../api.js";
import {withRouter} from "react-router-dom";

class WritePostPageContainer extends React.Component {
    state = {
        errorMessage: null,
        submitting: false
    };

    submitPost = async (title, content) => {
        const {history} = this.props;
        this.setState({submitting: true, errorMessage: null});
        try {
            const post = await createPost(title, content);
            history.push(`/@${post.author.username}/${post.urlSlug}`);
        } catch (error) {
            console.error("Error submitting post.", error);
            let errorMessage = "An error occurred.";
            switch (error.status) {
                case 401:
                    errorMessage = "You need to be logged in to make a post.";
                    break;
                case 403:
                    errorMessage = "You do not have permission to make this post.";
                    break;
            }
            this.setState({errorMessage});
        } finally {
            this.setState({submitting: false});
        }
    };

    render() {
        const {
            errorMessage,
            submitting
        } = this.state;

        return <WritePostPage
            errorMessage={errorMessage}
            onSubmit={this.submitPost}
            submitting={submitting}
        />
    }
}

export default withRouter(WritePostPageContainer);