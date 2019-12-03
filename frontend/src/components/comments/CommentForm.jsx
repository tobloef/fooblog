import React from "react";
import PropTypes from "prop-types";
import {Button, Form, TextArea} from "semantic-ui-react";

class CommentForm extends React.Component {
    state = {
        content: "",
    };

    render() {
        const {
            submitting,
            onSubmit,
        } = this.props;
        const {
            content,
        } = this.state;

        return <Form onSubmit={() => {
            if (submitting) {
                return;
            }
            onSubmit(content);
            this.setState({content: ""});
        }}>
            <Form.Field>
                <label>Write a new comment</label>
                <TextArea
                    placeholder={"Content"}
                    value={content}
                    onChange={(e, {value}) => this.setState({content: value})}
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
    }
}

CommentForm.propTypes = {
    submitting: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;