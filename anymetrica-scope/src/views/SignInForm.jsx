/* @flow */
import React from 'react';

import { Alert, Button, Form, Icon, Input } from 'antd';
import { signIn } from '../session';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class SignInForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { error: null, loading: false };
  }

  // I'm extremely sorry about lines above, Jesus,
  // but want to ask why you've gave this fucking react?
  componentDidMount() {
    this.ismounted = true;
  }

  componentWillUnmount() {
    this.ismounted = false;
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    this.props.form.validateFields(async (errors, values) => {
      if (errors) {
        this.setState({ loading: false });
      }
      try {
        const signInResult = await signIn({
          username: values.username,
          namespace: values.namespace,
          password: values.password,
        });
        this.setState({
          error: signInResult.error
            ? signInResult.error.message || signInResult.error.details
            : null,
          loading: false,
        });
      } catch (signInError) {
        this.setState({ error: signInError.message || signInError.details, loading: false });
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { error, loading } = this.state;
    return (
      <span>
        {error ? (<Alert message={error} type="error" showIcon />) : null}
        <Form
          onSubmit={(e, x) => this.onSubmit(e, x)}
          className="login-form"
        >
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your user name!' }],
            })(
              <Input
                autoFocus
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="example@test.com"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Your Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError()) || loading}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </span>
    );
  }
}
