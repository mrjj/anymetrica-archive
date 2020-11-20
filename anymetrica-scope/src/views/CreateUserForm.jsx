/* @flow */

import React from 'react';
import { Alert, Button, Checkbox, Col, DatePicker, Form, Input, Row, Select } from 'antd';

type PropsType = { form: Object, onSubmit: (data: Object) => void };

export class CreateUserForm extends React.Component<PropsType> {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  render() {
    const { form, onSubmit } = this.props;
    const handleSubmit = (e) => {
      e.preventDefault();
      form.validateFields(async (err, values) => {
        if (!err) {
          onSubmit(values);
        }
      });
    };

    const { error } = this.state;
    const { organizations } = this.props;
    return (
      <Form
        onSubmit={handleSubmit}
        className="create-form"
        layout="horizontal"
        style={{ maxWidth: 1600 }}
      >
        <Row>
          <Col span={20}>
            {error ? (<Alert message={error} type="error" />) : null}
            <Row gutter={12} style={{ marginTop: 8, marginBottom: 8 }}>
              <Col span={8}>
                {/* username */}
                <Form.Item>
                  <Input.Group compact>
                    {form.getFieldDecorator('username', {
                      // rules: [{ required: true, message: 'Please input user name!' }],
                      help: 'Leave username blank to allow user to define it',
                    })(
                      <Input placeholder="User name (Required)" style={{ width: '50%' }} />,
                    )}
                    {form.getFieldDecorator('organizationId',
                      (organizations.length === 0) ? {} : { initialValue: organizations[0].id })(
                        <Select placeholder="Namespace (Optional)" style={{ width: '50%' }}>
                          {
                            organizations.map((
                              { id, name },
                            ) => (
                              <Select.Option key={`${id}`} value={id}>{name}</Select.Option>))
                          }
                        </Select>,
                    )}
                  </Input.Group>
                </Form.Item>
              </Col>
              <Col span={4}>
                {/* email */}
                <Form.Item>
                  {form.getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input target user email!' }],
                  })(
                    <Input placeholder="E-mail (Required)" />,
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                {/* username */}
                <Form.Item>
                  {form.getFieldDecorator('label', {})(
                    <Input placeholder="Label (Optional)" />,
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                {/* is_virtual */}
                <Form.Item style={{ marginBottom: 0, marginTop: -3 }}>
                  {form.getFieldDecorator('is_virtual', {
                    valuePropName: 'checked',
                  })(
                    <Checkbox>
                      For test purposes?
                    </Checkbox>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8} style={{ marginTop: 8, marginBottom: 8 }}>
              <Col span={12}>
                <Form.Item>
                  <Input.Group compact>
                    {/* first_name */}
                    {form.getFieldDecorator('first_name')(
                      <Input placeholder="First name" style={{ width: '32.5%' }} />,
                    )}

                    {/* middle_name */}
                    {form.getFieldDecorator('middle_name')(
                      <Input placeholder="Middle name" style={{ width: '25%' }} />,
                    )}

                    {/* last_name */}
                    {form.getFieldDecorator('last_name')(
                      <Input placeholder="Last name" style={{ width: '32.5%' }} />,
                    )}

                    {/* suffix */}
                    {form.getFieldDecorator('suffix')(
                      <Input placeholder="Suffix" style={{ width: '10%' }} />,
                    )}
                  </Input.Group>
                </Form.Item>
              </Col>
              <Col span={4}>
                {/* date_of_birth */}
                <Form.Item>
                  {form.getFieldDecorator('date_of_birth', {})(
                    <DatePicker
                      style={{ width: '100%' }}
                      placeholder="Date of birth"
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={2} push={1}>
            {/* Create user Submit Button */}
            <Button
              style={{ marginTop: '2em' }}
              type="primary"
              htmlType="submit"
              icon="user-add"
            >
              Create user
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
