import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Form, TextArea} from "semantic-ui-react";

const CommentForm = ({
    submitting,
    onSubmit
}) => {
    const [content, setContent] = useState("");

    return (
        <Form onSubmit={() => {
            if (submitting) {
                return;
            }
            onSubmit(content);
            setContent("");
        }}>
            <Form.Field>
                <label>Write a new comment</label>
                <TextArea
                    placeholder={"Content"}
                    value={content}
                    onChange={(e, {value}) => setContent(value)}
                    style={{
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
    );
};

CommentForm.propTypes = {
    submitting: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;