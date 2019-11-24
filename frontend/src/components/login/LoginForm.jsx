import React from "react";
import {Button, Form, Input, Message} from "semantic-ui-react";
import PropTypes from "prop-types";

class LoginForm extends React.Component {
    render() {
        const {
            errorMessage,
            onSubmit,
            submitting,
            username,
            password,
            onChangeUsername,
            onChangePassword,
        } = this.props;

        return <>
            {
                errorMessage != null && <Message
                    error
                    header={"Log-in failed"}
                    content={errorMessage}
                />
            }
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <Input
                        placeholder={"Username"}
                        value={username}
                        onChange={(e, {value}) => onChangeUsername(value)}
                        autoComplete={"username"}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input
                        value={password}
                        onChange={(e, {value}) => onChangePassword(value)}
                        placeholder={"Password"}
                        type={"password"}
                        autoComplete={"current-password"}
                    />
                </Form.Field>
                <Button
                    type={"submit"}
                    primary
                    content={"Log in"}
                    loading={submitting}
                />
            </Form>
        </>
    }
}

LoginForm.propTypes = {
    errorMessage: PropTypes.string,
    onSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    username: PropTypes.string,
    password: PropTypes.string,
    onChangeUsername: PropTypes.func,
    onChangePassword: PropTypes.func,
};

export default LoginForm;