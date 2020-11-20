/* @flow */
import React from 'react';
import moment from 'moment';

export const TIME_CODE_STYLE = {
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
};

export function TimeCode(props) {
  const { seconds } = props;
  const momentDate = moment().startOf('year').add({ seconds: seconds || 0 });
  const [major, minor] = momentDate.format('HH:mm:ss.SS').split('.');
  const [h, m, s] = major.split(':');
  return (
    <span style={{ ...TIME_CODE_STYLE, ...(props.style || {}) }}>
      <span>{h}</span>
      <span className="bold" style={{ marginLeft: '0.1em', marginRight: '0.1em' }}>:</span>
      <span className="">{m}</span>
      <span className="bold" style={{ marginLeft: '0.1em', marginRight: '0.1em' }}>:</span>
      <span>{s}</span>
      <span style={{ marginLeft: '0.1em', marginRight: '0.1em' }}>.</span>
      <span className="fade">{minor}</span>
    </span>
  );
}
