import React, { useState } from "react";
import {Button, Form, Header, Input, Message, TextArea} from "semantic-ui-react";
import PropTypes from "prop-types";

const WritePostPage = ({
    errorMessage,
    onSubmit,
    submitting
}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return <div>
        <Header
            content={"Write a new blog post"}
        />
        {
            errorMessage != null && <Message
                error
                header={"Post submission failed"}
                content={errorMessage}
            />
        }
        <Form onSubmit={() => {
            if (submitting) {
                return;
            }
            onSubmit(title, content);
            setContent(content);
            setTitle(title);
        }}>
            <Form.Field>
                <label>Title</label>
                <Input
                    placeholder={"Title"}
                    value={title}
                    onChange={(e, {value}) => setTitle(value)}
                    style={{
                        marginBottom: "10px",
                    }}
                />
            </Form.Field>
            <Form.Field>
                <label>Content</label>
                <TextArea
                    placeholder={"Content"}
                    value={content}
                    onChange={(e, {value}) => setContent(value)}
                    style={{
                        marginBottom: "10px",
                        minHeight: "100px"
                    }}
                />
            </Form.Field>
            <Button
                type={"submit"}
                primary
                content={"Submit"}
                loading={submitting}
            />
        </Form>
    </div>
};

WritePostPage.propTypes = {
    errorMessage: PropTypes.string,
    onSubmit: PropTypes.func,
    submitting: PropTypes.bool,
};

export default WritePostPage;