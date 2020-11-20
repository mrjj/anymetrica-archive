import React from 'react';
import { View, ScrollView } from 'react-native';
// import { FileSystem, Permissions, Audio, Font } from 'expo'
import { List, NoticeBar, WhiteSpace, WingBlank } from 'antd-mobile-rn';
import Record from '../components/Record';
import {nowObj} from "anymetrica-utils";
import RegistryGRPCClient from 'anymetrica-api/dist/RegistryServiceClient';

export default class RecordingScreen extends React.Component {
  static navigationOptions = {
    header: 'Recording',
  }

  addNewRecord() {
    this.setState({
      records: [
        (<Record
          key={`rec-${this.state.records.length}`}
          onRecorded={() => this.addNewRecord()}
        />),
        ...this.state.records,
      ],
    });
  }

  constructor(props) {
    super(props);
    const records = props.records || [];

    if (records.length === 0) {
      records.push(<Record
        key={`rec-${records.length}`}
        onRecorded={() => this.addNewRecord()}
      />);
    }
    const client = RegistryGRPCClient({});
    const requestObj = { request_id: 137, client_ts: nowObj() };
    client.RegistryService.Heartbeat(requestObj);

    this.state = {
      records,
      message: '',
      error: '',
    };
  }

  render() {
    const { records, message } = this.state;

    return (
      <ScrollView
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          {message ? (
            <View>
              <WhiteSpace size="lg" />
              <NoticeBar
                marqueeProps={{ loop: false, leading: 500, trailing: 800, fps: 40, style: {} }}
              >
                {this.state.message}
              </NoticeBar>
            </View>
          ) : null}

          <WhiteSpace size="xl" />

          <List renderHeader={
            () => (((records.length - 1) > 0) ? `${(records.length - 1)} records` : 'no records to play')}
          >
            {records}
          </List>

        </View>
      </ScrollView>
    );
  }
}
