/* @flow */

import React from 'react';
import { Alert, Button, Form, Icon, Input } from 'antd';
import { UsernamePassword } from 'anymetrica-api/dist/enums';
import { registryClient } from '../client';
import { signIn } from '../session';

export class SignUpForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      otpIsValid: null,
      otp: this.props.otp,
      username: null,
      password: null,
    };
  }

  async componentDidMount(): void {
    if (this.props.otp) {
      this.checkotp().then().catch(console.error);
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.otpIsValid) {
      this.checkotp().then();
    } else {
      this.setUserNameAndPassword().then();
    }
  }

  async setUserNameAndPassword() {
    const username = document.getElementById('sign-up-username').value;
    const namespace = document.getElementById('sign-up-namespace').value;
    const password = document.getElementById('sign-up-password').value;
    const usernamePassword = {
      id: this.state.id,
      username,
      namespace,
      password,
    };
    this.setState({
      loading: true,
      error: null,
      ...usernamePassword,
    });
    try {
      const result = await registryClient.MergeUsernamePasswords({
        request: {
          credential: {
            otp: {
              otp: this.state.otp,
            },
          },
        },
        entities: [usernamePassword],
      });
      if (result.error) {
        this.setState({ error: `${result.error.details}`, loading: false });
        return null;
      }
      this.setState({
        ...usernamePassword,
        error: null,
        loading: false,
      });
      // Returned is without private part, not fine for signing in
      await signIn(usernamePassword);
    } catch (e) {
      this.setState({ error: `${e.message} ${e.stack}`, loading: false });
    }
    return null;
  }

  async checkotp() {
    const { otp } = this.state;
    this.setState({ loading: true, error: null, otpIsValid: null });
    try {
      const credential = { otp: { otp } };
      const res = await registryClient.Discover({
        request: { credential },
        types: [UsernamePassword],
      });
      if (res.error) {
        console.error(res.error.details);
        this.setState({ loading: false, otpIsValid: false });
        return;
      }
      const logPassCredentialsIds = res.entities[0].id;

      const usernamePassword = (await registryClient.GetUsernamePasswords({
        ids: [logPassCredentialsIds],
        request: { credential },
      })).entities[0];
      this.setState({
        otp,
        id: logPassCredentialsIds[0],
        ...usernamePassword,
        loading: false,
        otpIsValid: true,
      });
    } catch (e) {
      this.setState({ error: `${e.message} ${e.stack}`, loading: false, otpIsValid: false });
    }
  }

  // onotpUpdate(otp) {
  //   this.setState({ otp });
  //   this.props.router.navigate(`/sign-up/${otp}`, {
  //     trigger: false,
  //     replace: true,
  //   });
  // }

  render() {
    const { error, loading, otp, otpIsValid } = this.state;
    const submitDisabled = (!otp) || loading;
    /* || (
      (!this.state.usernamePassword)
      || (!this.state.usernamePassword.private)
      || (!this.state.usernamePassword.public)
    ) */
    return (
      <div>
        {error ? (<Alert message={error} type="error" showIcon />) : null}
        <Form onSubmit={e => this.onSubmit(e)} className="login-form">
          <Form.Item
            help={(!otp) ? 'Please, enter otp' : ((otpIsValid === false) && 'Entered otp is not valid')}
            validateStatus={((otpIsValid === false) || (!otp)) ? 'error' : null}
          >
            <Input
              autoFocus
              prefix={<Icon type="qrcode" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="otp"
              onChange={(e) => { this.setState({ otp: e.target.value, otpIsValid: null }); }}
              value={otp}
              disabled={otpIsValid}
            />
          </Form.Item>
          {otpIsValid ? (
            <div>
              <Form.Item>
                <Input
                  id="sign-up-username"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Define your user name"
                  value={this.state.username}
                  autoFocus
                  autoComplete="username"
                  onChange={(e) => {
                    this.setState({
                      username: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  disabled
                  id="sign-up-namespace"
                  value={this.state.namespace}
                />
              </Form.Item>

              <Form.Item>
                <Input
                  id="sign-up-password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                  autoComplete="password"
                  value={this.state.password}
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                />
              </Form.Item>
            </div>
          ) : null}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={submitDisabled}
            >
              {otpIsValid ? 'Set credentials and Sign Up' : 'Apply invitation otp'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
