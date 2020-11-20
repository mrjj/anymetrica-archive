/* @flow */
import React from 'react';
import { Layout } from 'antd';

const DEFAULT_FOOTER = (
  <span>
    <span style={{ margin: 2 }}>Copyright,</span>
    <span style={{ margin: 2 }}>{(new Date()).getUTCFullYear()}</span>
    <span style={{ margin: 2 }}>by</span>
    <a style={{ margin: 2 }} href="https://anymetrica.com" target="_blank">Anymetrica</a>
  </span>
);

export class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text } = this.props;
    return (
      <Layout.Footer style={{ textAlign: 'center' }}>{text || DEFAULT_FOOTER}</Layout.Footer>);
  }
}
