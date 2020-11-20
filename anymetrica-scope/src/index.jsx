/* @flow */
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BaseLayout } from './views/BaseLayout';
import { ErrorsBoundary } from './components/ErrorsBoundary';

type StateType = {
  redirectLocation: { pathname: string },
  redirectToReferrer: string,
  message: {
    type: 'info' | 'message' | 'error' | 'warning',
    text: ?string,
  }
}

export type PropsType = {}

class Index extends React.Component<PropsType, StateType> {
  render() {
    return (
      <ErrorsBoundary>
        <BaseLayout {...this.state} />
      </ErrorsBoundary>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
