import React from "react";
import {Button, Form, Header, Input, Message, TextArea} from "semantic-ui-react";
import PropTypes from "prop-types";

class WritePostPage extends React.Component {
    state = {
        title: "",
        content: "",
    };

    render() {
        const {title, content} = this.state;
        const {errorMessage, onSubmit, submitting} = this.props;

        return <div>
            <Header
                content={"Write new blog post"}
            />
            <Form onSubmit={() => {
                if (submitting) {
                    return;
                }
                onSubmit(title, content);
            }}>
                {
                    errorMessage != null && <Message
                        error
                        header={"Post submission failed"}
                        content={errorMessage}
                    />
                }
                <Form.Field>
                    <label>Title</label>
                    <Input
                        placeholder={"Title"}
                        value={title}
                        onChange={(e, {value}) => this.setState({title: value})}
                        style={{
                            marginBottom: "10px",
                        }}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Content</label>
                    <TextArea
                        placeholder={"Content"}
                        value={title}
                        onChange={(e, {value}) => this.setState({content: value})}
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
    }
}

WritePostPage.propTypes = {
    errorMessage: PropTypes.string,
    onSubmit: PropTypes.func,
    submitting: PropTypes.bool,
};

export default WritePostPage;