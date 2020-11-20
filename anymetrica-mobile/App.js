/* @flow */
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

// const config = loadConfig('./src/config.json');


// import AnymetricaIamClient from './build/grpcClients/anymetricaIamClient';
// import AnymetricaMachsanClient from './build/grpcClients/anymetricaMachsanClient';

// const packageDefinition = loadSync(
//   './node_modules/anymetrica-api/protos/anymetrica/registry.proto',
//   PROTO_LOADER_CONF,
// );
// const serviceDefinition = grpc.loadPackageDefinition(packageDefinition).anymetrica.registry;
// export const getClient = () => {
//   const clientConnStr = `${config.GRPC_HOST}:${config.GRPC_PORT}`;
//   info(`Creating gRpc client using endpoint: "${clientConnStr}" ...`);
//   return new serviceDefinition.RegistryService(
//     clientConnStr,
//     grpc.credentials.createInsecure(),
//   );
// };
//

const { DEFAULT_GRPC_HOST, DEFAULT_GRPC_PROTOCOL, DATETIME_KEY_OUTPUT } = require('./constants/Grpc');
serviceWebClient
// const { ProximityMatrixRequest, Timestamp, ResourceType, EchoRequest } = require(`./../../dist/grpc/field_pb`);
// const { FieldServiceClient } = require(`./grpcClients/a../../dist/grpc/field_grpc_web_pb`);

export async function getDate(date) {
  if (!date) {
    console.error('No date', date);
    return Promise.resolve({});
  }

  // const clientIan = AnymetricaIamClient('/', null, null);
  const clientRegistry = AnymetricaRegistryClient('/', null, null);

  const request = new ProximityMatrixRequest();


  // const echoRequest = new EchoRequest();
  // echoRequest.setMessage('test');
  return new Promise((resolve, reject) => {
    const call = client.getProximityMatrix(
      request,
      {},
      (err, response) => {
        console.log('RES', response);
        if (err) {
          console.error('Error:', err);
          reject(err);
        } else {
          window.setTimeout(() => {
            const m = response.getMessage();
            console.error(m);
            reject(m);
          }, 5000);
        }
      },
    );
    call.on('status', (status) => {
      console.log('status', status);
      if (status.metadata) {
        console.log('Received metadata');
        console.log(status.metadata);
        resolve(status);
      }
    });
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }

  _loadResourcesAsync = async () => Font.loadAsync({
    anticon: require('./assets/fonts/anticon.ttf'),
  });

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
