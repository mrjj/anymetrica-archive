/* @flow */
import React from 'react';
import { seconds2moment } from 'anymetrica-utils';

export function TimeRange(props) {
  const secToCell = (sec) => {
    const d = seconds2moment(sec).format('YYYY MMM');
    const day = seconds2moment(sec).format('DD');
    const dw = `(${seconds2moment(sec).format('ddd')})`;
    const t = seconds2moment(sec).format('HH:mm:ss');
    //  <span style="light">{dw}</span>
    return (
      <div style={{ textAlign: 'left', flex: 1 }}>
        <div className="small">
          <span style={{ marginRight: '0.25em' }}>{d}</span>
          <span style={{ marginRight: '0.25em' }}>{day}</span>
          <span className="light">{dw}</span>
        </div>
        <div>{t}</div>
      </div>
    );
  };
  const { media_start_ts, media_end_ts } = props;
  return (
    <div style={{ whiteSpace: 'nowrap', display: 'flex', flexDirection: 'row' }}>
      {media_start_ts ? secToCell(parseInt(media_start_ts.seconds, 10)) : 'N/A'}
      <span style={{ padding: '0.5em', textAlign: 'center' }}> - </span>
      {media_start_ts ? secToCell(parseInt(media_end_ts.seconds, 10)) : 'N/A'}
    </div>);
}
