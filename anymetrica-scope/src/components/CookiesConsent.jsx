/* @flow */
import React from 'react';
import { Button } from 'antd';
import { STORAGE } from '../session';

type PropsType = { accepted?: ?boolean };
type StateType = { accepted: boolean };
const ACCEPTED_STORE_KEY = 'cookies-consent-accepted';

export class CookiesConsent extends React.Component<PropsType, StateType> {
  constructor(props) {
    super(props);
    const { accepted } = this.props;
    this.state = {
      accepted: (typeof accepted === 'boolean')
        ? accepted
        : !!STORAGE.getItem(ACCEPTED_STORE_KEY),
    };
  }

  onConfirm = () => {
    STORAGE.setItem(ACCEPTED_STORE_KEY, true);
    this.setState({ accepted: true });
  };

  render() {
    if (this.state.accepted) {
      return null;
    }
    return (
      <div className="cookies-consent" style={{ display: 'flex', flexDirection: 'row' }}>
        <h1>We use cookies and other tracking to:</h1>
        <div style={{ marginRight: '2em' }}>
          <ul>
            <li>improve your browsing experience on our website</li>
            <li>show you personalized content and targeted ads</li>
            <li>analyze our website traffic</li>
            <li>understand where our visitors are coming from</li>
          </ul>
        </div>
        <div>
          <h1>{' '}</h1>
          <div style={{ marginBottom: '1em' }}>
            By browsing our website, you consent to our
            <br />
            use of cookies and other tracking technologies.
          </div>
          <Button onClick={() => this.onConfirm()} htmlType="button" size="small">I agree</Button>
        </div>
      </div>
    );
  }
}
