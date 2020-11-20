/* @flow */
import React from 'react';
import { Alert, Button, Col, Form, Icon, Input, Row, Select, Spin } from 'antd';
import omit from 'lodash.omit';
import { CAN_READ, CAN_READ_RELATIONS, Device, OWNS } from 'anymetrica-api/dist/enums';
import { registryClient } from '../client';

import { MetadataCell } from '../components/MetadataCell';
import { DataTable } from '../components/DataTable';


const columns = [
  {
    title: 'Label',
    dataIndex: 'metadata.label',
    key: 'metadata.label',
  },
  {
    title: 'Type',
    dataIndex: 'device_type',
    key: 'device_type',
  },
  {
    title: 'Manufacturer',
    dataIndex: 'manufacturer',
    key: 'manufacturer',
  },
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
  },
  {
    title: 'Sub-model',
    dataIndex: 'sub_mode',
    key: 'sub_mode',
  },
  {
    title: 'Revision',
    dataIndex: 'revision',
    key: 'revision',
  },
  {
    title: 'UDID',
    dataIndex: 'udid',
    key: 'udid',
  },
  {
    title: 'UDFV',
    dataIndex: 'udfv',
    key: 'udfv',
  },
  {
    title: 'IMEI',
    dataIndex: 'imei',
    key: 'imei',
  },
  {
    title: 'Metadata',
    dataIndex: 'metadata',
    render: (text, obj) => (<MetadataCell {...obj.metadata} orientation="vertical" />),
    key: 'metadata',
  },
];

const DEVICE_TYPES = [
  {
    label: 'Mobile phone',
    value: 'PHONE',
  },
  {
    label: 'Tablet',
    value: 'TABLET',
  },
  {
    label: 'Desktop/Laptop Computer',
    value: 'DESKTOP',
  },
  {
    label: 'Electronic tag (incl. passive)',
    value: 'TAG',
  },
  {
    label: 'Electronic badge (incl. passive)',
    value: 'BADGE',
  },
  {
    label: 'Smart Watch',
    value: 'SMART_WATCH',
  },
  {
    label: 'Generic fitness Device',
    value: 'FITNESS_DEVICE',
  },
  {
    label: 'Sound recording device',
    value: 'SOUND_RECORDER',
  },
  {
    label: 'Video recording device',
    value: 'VIDEO_RECORDER',
  },
  {
    label: 'Robotic device (non-vehicle)',
    value: 'ROBOTIC',
  },
  {
    label: 'Polymorphic device (e.g. phone emulator)',
    value: 'POLYMORPHIC',
  },
  {
    label: 'Non-standard category',
    value: 'OTHER',
  },
  /*
  {
    label: 'Type not specified',
    value: 'UNSPECIFIED'
  },
  */
];

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class CreateDeviceForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { error: null, loading: false };
  }

  render() {
    const { form } = this.props;
    const handleSubmit = (e) => {
      e.preventDefault();
      form.validateFields(async (err, values) => {
        if (!err) {
          form.onSubmit([
            { ...(omit(values, ['label'])), metadata: { label: values.label || null } },
          ]);
        }
      });
    };

    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { error, loading } = this.state;
    return (
      <div>
        {error ? (<Alert message={error} type="error" showIcon />) : null}
        <Spin spinning={loading} delay={500}>
          <Form
            onSubmit={handleSubmit}
            className="create-form"
            layout="horizontal"
            style={{ maxWidth: 1600 }}
          >
            <Row gutter={16}>
              <Col span={4}>
                <span style={{ fontSize: '0.7em' }}>
                You should be able to take photo of QR code or enter
                  code manually in installed application
                </span>
              </Col>
              <Col span={4}>
                <Form.Item label={(
                  <span style={{ fontSize: '0.7em' }}>Device type</span>)}
                >
                  {getFieldDecorator('device_type', {
                    initialValue: 'PHONE',
                  })(
                    <Select label="Device type">
                      {DEVICE_TYPES.map(({ value, label }) => (
                        <Select.Option key={value} value={value}>{label}</Select.Option>))}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label={(
                  <span style={{ fontSize: '0.7em' }}>
                    Some distinctive label for your devise
                  </span>)}
                >
                  {getFieldDecorator('label', {
                    // initialValue: 'My Device X'
                  })(
                    <Input
                      placeholder="MyDevice X"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={(<span style={{ fontSize: '0.7em' }}>Universal Device ID</span>)}>
                  {getFieldDecorator('udid', {})(
                    <Input
                      placeholder="UDID"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  label={(<span style={{ fontSize: '0.7em' }}>Identifier For Vendor</span>)}
                >
                  {getFieldDecorator('idfv', {})(
                    <Input
                      placeholder="IDFV"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={(
                  <span
                    style={{ fontSize: '0.7em' }}
                  >
International Mobile Equipment Identity
                  </span>)}
                >
                  {getFieldDecorator('imei', {})(
                    <Input
                      placeholder="IMEI"
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={4}>
                <Form.Item label={(
                  <span style={{ fontSize: '0.7em' }}>Physical access to device is required</span>)}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}
                  >
                    <Icon type="qrcode" />
                    {' '}
                    Start connection process
                  </Button>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label={(
                  <span style={{ fontSize: '0.7em' }}>Manufacturer</span>)}
                >
                  {getFieldDecorator('manufacturer', {})(
                    <Input
                      placeholder="Dahua Ind."
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label={(<span style={{ fontSize: '0.7em' }}>Manufacturer site URI</span>)}
                >
                  {getFieldDecorator('manufacturer_site_uri', {})(
                    <Input
                      placeholder="http://harwarefactory.cn/devices/model_x"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  label={(<span style={{ fontSize: '0.7em' }}>Model</span>)}
                >
                  {getFieldDecorator('model', {})(
                    <Input
                      placeholder="Model x2_2018"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  label={(<span style={{ fontSize: '0.7em' }}>Sub-model</span>)}
                >
                  {getFieldDecorator('sub_model', {})(
                    <Input
                      placeholder="Sub-model dX1"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  label={(<span style={{ fontSize: '0.7em' }}>Revision</span>)}
                >
                  {getFieldDecorator('revision', {})(
                    <Input
                      placeholder="Rev1"
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </div>
    );
  }
}


// eslint-disable-next-line react/no-multi-comp
export class DevicesPage extends React.Component {
  async doCreate(entity: Object): Promise<Object> {
    const credential = this.props.session;
    const device = await registryClient.MergeDevices({
      entities: entity,
    });

    const otp = await registryClient.MergeOTPs({
      entities: [
        {
          is_not_set: true,
          is_revoked: false,
        },
      ],
    });
    const session = await registryClient.MergeSessionTokens({
      entities: [
        {
          is_not_set: true,
          is_revoked: false,
        },
      ],
    });

    const otpID = otp.id;
    const sessionID = session.id;
    const deviceID = device.id;

    // const relations
    await registryClient.MergeRelations({
      credential,
      relations: [
        { from_id: otpID, to_id: otpID, relation_type: CAN_READ },
        { from_id: otpID, to_id: otpID, relation_type: CAN_READ_RELATIONS },

        { from_id: otpID, to_id: sessionID, relation_type: CAN_READ },

        { from_id: sessionID, to_id: deviceID, relation_type: OWNS },
      ],
    });
  }

  async doRefresh(): Promise<Array<Object>> {
    const foundDevices = await registryClient.Discover({
      types: [Device],
    });
    if (foundDevices.relations.length) {
      const entities = await registryClient.GetDevices({
        ids: foundDevices.relations.map(({ to: { id } }) => id),
      });
      return (entities.entities || []);
    }
    return [];
  }

  render() {
    return (
      <DataTable
        rowKey={({ id }) => id}
        form={CreateDeviceForm}
        columns={columns}
        doCreate={entities => this.doCreate(entities)}
        doRefresh={() => this.doRefresh()}
      />
    );
  }
}

export default DevicesPage;
