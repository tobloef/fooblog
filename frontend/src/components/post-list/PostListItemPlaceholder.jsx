import React from "react";
import { Placeholder, Segment } from "semantic-ui-react";

const PostListItemPlaceholder = () => (
    <Segment>
        <Placeholder fluid>
            <Placeholder.Header>
                <Placeholder.Line/>
            </Placeholder.Header>
            <Placeholder.Paragraph>
                <Placeholder.Line length={"full"}/>
                <Placeholder.Line length={"full"}/>
                <Placeholder.Line/>
            </Placeholder.Paragraph>
        </Placeholder>
    </Segment>
);

export default PostListItemPlaceholder;