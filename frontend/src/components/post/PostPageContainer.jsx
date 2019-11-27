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
            const {username, urlSlug} = this.props.match.params;
            // noinspection JSIgnoredPromiseFromCall
            this.fetchPost(username, urlSlug);
        }
    }

    fetchPost = async (username, urlSlug) => {
        this.setState({loading: true, errorMessage: null});
        try {
            const post = await fetchPost(username, urlSlug);
            this.setState({post});
        } catch (error) {
            console.error("Error fetching post.", error);
            this.setState({errorMessage: error.statusText || "An error occurred."});
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
        const {
            user
        } = this.props;

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
            urlSlug={post.urlSlug}
            user={user}
        />
    }
}

export default withRouter(PostPageContainer);