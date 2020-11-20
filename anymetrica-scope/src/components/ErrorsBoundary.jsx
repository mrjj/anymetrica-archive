/* @flow */
import React from 'react';
import * as Sentry from '@sentry/browser';
import { SENTRY_CONFIG } from '../constants';

Sentry.init(SENTRY_CONFIG);

export class ErrorsBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.error) {
      // render fallback UI
      return (
        <button type="button" onClick={() => Sentry.showReportDialog()}>
          Report feedback
        </button>
      );
    }
    // when there's not an error, render children untouched
    return this.props.children;
  }
}
