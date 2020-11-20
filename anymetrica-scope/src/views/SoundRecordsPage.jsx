/* eslint-disable no-undef */
/* @flow */
import React from 'react';
import { Card } from 'antd';
import { CREATED, File } from 'anymetrica-api/dist/enums';
import { registryClient } from '../client';
import { VoiceTimeline } from '../components/VoiceTimeline';
import { DataTable } from '../components/DataTable';
import { TimeRange } from '../components/TimeRange';

export const disableSpace = e => ((e || {}).keyCode !== 32);

export class SoundRecordsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeId: null,
    };
  }

  componentDidMount(): void {
    document.addEventListener('keyup', disableSpace);
  }

  componentWillUnmount(): void {
    document.removeEventListener('keyup', disableSpace);
  }

  async refresh(): Promise<Array<Object>> {
    const { entities } = (await registryClient.Discover(
      {
        request: {
          types: [File],
          relation_types: [CREATED],
          traverse_depth: 1,
        },
      },
      {
        discoverFrom: false,
        discoverTo: true,
      },
    ));
    this.setState({
      activeId: ((entities && (entities.length > 0)) ? entities[0].id : null),
    });
    return entities;
  }

  render() {
    const columns = [
      {
        title: 'Start - End (UTC0)',
        width: 128,
        render: (_, obj) => (
          <TimeRange media_start_ts={obj.media_start_ts} media_end_ts={obj.media_end_ts} />
        ),
      },
      {
        // width: '100%',
        dataIndex: 'id',
        key: 'id',
        render: (id, r) => (
          <VoiceTimeline
            activateHandler={() => {
              this.setState({ activeId: id });
            }}
            isActive={this.state.activeId === id}
            record={r}
          />
        ),
      },
    ];
    return (
      <div>
        <Card>
          <DataTable
            rowClassName="row-compact"
            rowKey={({ id }) => id}
            columns={columns}
            doCreate={this.doCreate}
            doRefresh={() => this.refresh()}
          />
        </Card>
      </div>
    );
  }
}

/*
  <Row>
            <Col span={8}>
              <span className="big light">Mr User Name</span>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card style={{ height: 64, marginBottom: 8, padding: 0 }} bodyStyle={{ padding: 0 }}>
                <div className="daily-timeline">{
                  records.map((record, idx) => {
                    const mediaStartTsMs = obj2ms(record.media_start_ts);
                    const mediaEndTsMs = obj2ms(record.media_end_ts);
                    const recordDuration = (mediaEndTsMs - mediaStartTsMs);
                    const recordPart = recordDuration / VIEW_RANGE_MS;
                    const recordPercent = recordPart * 100;
                    const constPrevRecordEndTsMs = (idx > 0)? obj2ms(records[idx - 1].media_end_ts)
                     : mediaStartTsMs;
                    const marginLeftPercent = (constPrevRecordEndTsMs / VIEW_RANGE_MS) * 100;
                    / 1000, 'sec', recordPercent, '%', marginLeftPercent, '%');
                    return (<VoiceTimeline
                      record={record}
                      style={{
                        marginLeft: `${marginLeftPercent}%`,
                        width: `${recordPercent}%`,
                      }}
                    />);
                  })
                }</div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ display: 'flex', marginBottom: 16 }}>
              {' '.repeat(VIEW_RANGE_HOURS).split('').map((_, h) => {
                const t2 = moment()
                  .startOf('hour')
                  .add(VIEW_RANGE_HOURS, 'hour')
                  .subtract(h, 'hour');
                const t1 = t2.clone().subtract(1, 'hour');

                return (<span
                  key={h}
                  style={{
                    flex: 1,
                    height: 16,
                    textAlign: 'center',
                    borderRight: 0.5,
                    borderLeft: 0.5,
                  }}
                  className="small"
                >
                  {t1.format('DD MMM HH:mm')} - {t2.format('DD MMM HH:mm')}
                </span>);
              })}
            </Col>
          </Row>
 */
