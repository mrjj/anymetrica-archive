/* @flow */

import React from 'react';
import { Form, Layout, Tabs } from 'antd';
import { getStored } from '../session';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { CookiesConsent } from '../components/CookiesConsent';
import './AnonymousPage.css';
import { RequestDemoForm } from './RequestDemoForm';
import { Logo } from './Logo';
import { REQUEST_DEMO_ENABLED } from '../constants';

type StateType = { namespace: ?string, otp: ?string, loading: boolean }
type PropsType = { namespace: ?string, otp: ?string }

export class AnonymousPage extends React.Component<PropsType, StateType> {
  constructor(props) {
    super(props);
    this.state = {
      session: null,
      usernamePassword: null,
      otp: this.props.otp,
    };
  }

  render() {
    const { token } = getStored();
    if (token) {
      this.props.router.navigate('/home/dashboard', { trigger: true });
      return (<div />);
    }
    this.WrappedSignInForm = this.WrappedSignInForm || Form.create({ name: 'sign-in' })(SignInForm);
    this.WrappedRequestDemoForm = this.WrappedRequestDemoForm || Form.create({ name: 'request-demo' })(RequestDemoForm);
    const tabs = [
      {
        title: 'Sign In',
        key: 'sign-in',
        getComponent: args => (
          <div>
            <this.WrappedSignInForm {...args} onSignIn={this.props.onSignIn} />
          </div>
        ),
      },
      {
        title: 'Sign Up',
        key: 'sign-up',
        otp: this.state.otp,
        getComponent: () => (
          <div><SignUpForm {...this.props} {...this.state} onSignIn={this.props.onSignIn} /></div>),
      },
    ];
    const forms = this.state.otp ? (
      <Tabs
        activeKey={this.props.tab}
        onChange={(activeKey) => {
          const activeTab = tabs.filter(({ key }) => key === activeKey);
          this.props.router.navigate(
            `/${activeKey}${activeTab[0].otp ? `/${activeTab[0].otp}` : ''}`,
            { trigger: true },
          );
        }}
      >
        {tabs.map(({ title, key, getComponent }) => (
          <Tabs.TabPane
            key={key}
            tab={title}
          >
            {getComponent({ otp: this.props.otp })}
          </Tabs.TabPane>
        ))}
      </Tabs>
    ) : (
      <div>
        <this.WrappedSignInForm
          onSignIn={e => (this.props.onSignIn ? this.props.onSignIn(e) : null)}
        />
        {REQUEST_DEMO_ENABLED ? (
          <this.WrappedRequestDemoForm
            onSignIn={e => (this.props.onRequestDemo ? this.props.onRequestDemo(e) : null)}
          />
        ) : null}
      </div>
    );

    return (
      <div className="sign-in">
        <div className="sign-in-background" />
        <Logo />
        <Layout>
          <Layout.Header className="cookies-consent-header">
            <CookiesConsent />
          </Layout.Header>
          <Layout.Content>
            <div className="container">
              <div className="content">
                <div className="form-wrapper">
                  <div>
                    {forms}
                  </div>
                </div>
              </div>
            </div>
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}

export default AnonymousPage;
