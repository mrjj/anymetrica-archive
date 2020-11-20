/* @flow */
import { seconds2moment } from 'anymetrica-utils';
import React from 'react';
import { Tag } from 'antd';

export const secondsToHumanTime = seconds => (
  seconds ? seconds2moment(seconds).format('YYYY-MM-DD HH:MM:ss') : 'N/A'
);

export class MetadataCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      is_deleted,
      id,
      type,
      updated_ts,
      created_ts,
      deleted_ts,
      orientation,
      label,
    } = this.props;
    const deletedCell = is_deleted ? (
      <div className="metadata-cell">
        <span className="timestamp-name">
            deleted:
        </span>
        <span>
          {secondsToHumanTime(deleted_ts)}
        </span>
      </div>
    ) : null;

    const updatedCell = updated_ts ? (
      <div className="metadata-cell">
        <span className="timestamp-name">
            updated:
        </span>
        <span>
          {secondsToHumanTime(updated_ts)}
        </span>
      </div>
    ) : null;

    const createdCell = created_ts ? (
      <div className="metadata-cell">
        <span className="timestamp-name">
            created:
        </span>
        <span>
          {secondsToHumanTime(created_ts)}
        </span>
      </div>
    ) : null;

    const statusCell = (
      <div className="metadata-cell">
        <Tag color="#108ee9">{type}</Tag>
        {is_deleted ? (<Tag color="#a0a0a0">Deactivated</Tag>) : (
          <Tag color="#0ecc2e">Active</Tag>)}
      </div>);

    const labelCell = (
      <div className="metadata-cell">
        <span className="bold">{label}</span>
      </div>);

    const idCell = (<div className="id metadata-cell">{id}</div>);

    return (
      <div className={`metadata ${orientation}`}>
        {statusCell}
        {labelCell}
        {idCell}
        {deletedCell}
        {updatedCell}
        {createdCell}
      </div>
    );
  }
}
