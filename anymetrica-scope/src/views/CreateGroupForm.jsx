/* @flow */

import React from 'react';
import { Alert, Button, Checkbox, Col, Form, Input, Row } from 'antd';

const FormItem = Form.Item;

type PropsType = { form: Object, onSubmit: (data: Object) => void, isGeographicLocation: ?boolean, setGeographicLocationMode: (enabled: boolean) => void };
type StateType = { isGeographicLocation: boolean, error: ?string };

export class CreateGroupForm extends React.Component<PropsType, StateType> {
  constructor(props) {
    super(props);
    this.state = { error: null, isGeographicLocation: props.isGeographicLocation || false };
  }

  setGeographicLocation(e) {
    if (this.props.setGeographicLocationMode) {
      this.props.setGeographicLocationMode(e.target.checked);
    }
    this.setState({ isGeographicLocation: e.target.checked });
  }

  render() {
    const { form, onSubmit } = this.props;

    const handleSubmit = (e) => {
      e.preventDefault();
      form.validateFields(async (err, values) => {
        if (!err) {
          return onSubmit(values);
        }
        return null;
      });
    };

    const { error } = this.state;
    return (
      <Form
        onSubmit={handleSubmit}
        className="create-form"
        layout="vertical"
        style={{ maxWidth: 1200 }}
      >
        {error ? (<Alert message={error} type="error" />) : null}
        <Row gutter={16}>
          <Col span={16}>
            <Row>
              <FormItem>
                <Col span={24}>
                  {form.getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input the group name!' }],
                  })(
                    <Input placeholder="New group name" />,
                  )}
                </Col>
              </FormItem>
            </Row>
            {this.state.isGeographicLocation ? (
              <span>
                <Row>
                  <FormItem>

                    <Col span={8}>
                      {form.getFieldDecorator('postal_code', {
                        label: 'Postal code',
                      })(
                        <Input placeholder="Postal code" />,
                      )}
                    </Col>
                    <Col span={4}>
                      {form.getFieldDecorator('minor_postal_code', {
                        label: 'Minor Postal code',
                      })(
                        <Input placeholder="Minor Postal code" />,
                      )}
                    </Col>
                    <Col span={12}>
                      {form.getFieldDecorator('administrative_area', {
                        label: 'Administrative area',
                      })(
                        <Input placeholder="Administrative area" />,
                      )}
                    </Col>
                  </FormItem>
                </Row>
                <Row>
                  <FormItem>
                    <Col span={12}>
                      {form.getFieldDecorator('locality', {
                        label: 'City/Locality',
                      })(
                        <Input placeholder="City/Locality" />,
                      )}
                    </Col>
                    <Col span={12}>
                      {form.getFieldDecorator('sublocality', {
                        label: 'District/Sub-Locality',
                      })(
                        <Input placeholder="District/Sub-Locality" />,
                      )}
                    </Col>
                  </FormItem>
                </Row>
                <Row>
                  <FormItem>
                    <Col span={12}>
                      {form.getFieldDecorator('address_lines_1', {
                        label: 'Address line 1',
                      })(
                        <Input placeholder="Address line 1" />,
                      )}
                    </Col>
                    <Col span={12}>
                      {form.getFieldDecorator('address_lines_2', {
                        label: 'Address line 2',
                      })(
                        <Input placeholder="Address line 2" />,
                      )}
                    </Col>
                  </FormItem>
                </Row>
              </span>
            ) : null}
          </Col>
          <Col span={4}>
            <FormItem>
              <Checkbox
                value={this.state.isGeographicLocation}
                onChange={(e) => { this.setGeographicLocation(e); }}
              >
                Is geographic location
              </Checkbox>
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                icon="plus"
              >
                Create group
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
