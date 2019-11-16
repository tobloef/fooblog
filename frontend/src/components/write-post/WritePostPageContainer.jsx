import React from "react";
import WritePostPage from "./WritePostPage.jsx";
import {createPost} from "../../api.js";

class WritePostPageContainer extends React.Component {
    state = {
        errorMessage: null,
        submitting: false
    };

    submitPost = async (title, content) => {
        this.setState({submitting: true});
        try {
            await createPost(title, content);
        } catch (error) {
            console.error("Error submitting post.", error);
            let errorMessage = "An error occurred.";
            // TODO: Check error type
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

export default WritePostPageContainer;