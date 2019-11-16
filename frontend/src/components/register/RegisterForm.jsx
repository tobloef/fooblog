import React from "react";
import PropTypes from "prop-types";
import {Button, Form, Input, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";

class RegisterForm extends React.Component {
    render() {
        const {
            errorMessage,
            onSubmit,
            submitting,
            registrationCompleted,
            username,
            password,
            onChangeUsername,
            onChangePassword,
        } = this.props;

        return <Form onSubmit={onSubmit}>
            {
                errorMessage != null && <Message
                    error
                    header={"Registration failed"}
                    content={errorMessage}
                />
            }
            {
                registrationCompleted != null && <Message success>
                    <Message.Header>Registration succeeded</Message.Header>
                    <p>Continue to the <Link to={"/login"}>log-in page</Link> to log in to your new account.</p>
                </Message>
            }
            <Form.Field>
                <label>Username</label>
                <Input
                    placeholder={"Username"}
                    value={username}
                    onChange={(e, {value}) => onChangeUsername(value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <Input
                    value={password}
                    onChange={(e, {value}) => onChangePassword(value)}
                    placeholder={"Password"}
                    type={"password"}
                />
            </Form.Field>
            <Button
                type={"submit"}
                primary
                content={"Register"}
                loading={submitting}
            />
        </Form>
    }
}

RegisterForm.propTypes = {
    errorMessage: PropTypes.string,
    onSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    username: PropTypes.string,
    password: PropTypes.string,
    onChangeUsername: PropTypes.func,
    onChangePassword: PropTypes.func,
};

export default RegisterForm;