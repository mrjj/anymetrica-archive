/* @flow */
import React from 'react';
import { Layout } from 'antd';

export const HEADER_STYLE = {
  margin: '24px 16px 0',
  background: '#fff',
  paddingLeft: 24,
  paddingRight: 24,
  fontSize: '2em',
  fontWeight: 100,
};

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title } = this.props;
    return (<Layout.Header style={HEADER_STYLE}>{title || 'Index'}</Layout.Header>);
  }
}
