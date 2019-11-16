import React from "react";
import PostPage from "./PostPage.jsx";
import {withRouter} from "react-router-dom";
import {Message} from "semantic-ui-react";
import PostPagePlaceholder from "./PostPagePlaceholder.jsx";
import {fetchPost} from "../../api.js";

class PostPageContainer extends React.Component {
    state = {
        post: null,
        loading: false,
        errorMessage: null,
    };

    componentDidMount() {
        if (this.props.post != null) {
            this.setState({post: this.props.post});
        } else {
            const {postSlug} = this.props.match.params;
            // noinspection JSIgnoredPromiseFromCall
            this.fetchPost(postSlug);
        }
    }

    fetchPost = async (postSlug) => {
        this.setState({loading: true});
        try {
            const post = await fetchPost(postSlug);
            this.setState({post});
        } catch (error) {
            console.error("Error fetching post.", error);
            let errorMessage = "An error occurred.";
            // TODO: Check error type
            this.setState({errorMessage});
        } finally {
            this.setState({loading: false});
        }
    };

    render() {
        const {
            post,
            loading,
            errorMessage
        } = this.state;

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
        />
    }
}

export default withRouter(PostPageContainer);