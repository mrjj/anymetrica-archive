/* @flow */

import React from 'react';
import { Alert, Button, Col, Form, Input, Row } from 'antd';

const FormItem = Form.Item;

type PropsType = { form: Object, onSubmit: (data: Object) => void };

export class CreateOrganizationForm extends React.Component<PropsType> {
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
          return onSubmit(values);
        }
      });
    };

    const { error } = this.state;
    return (
      <Form
        onSubmit={handleSubmit}
        className="create-form"
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        {error ? (<Alert message={error} type="error"/>) : null}
        <Row gutter={8}>
          <Col span={8}>
            <FormItem>
              {form.getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the organization name!' }],
              })(
                <Input placeholder="New organization name"/>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              {form.getFieldDecorator('domain', {
                // TODO: Domain validation
                rules: [{ required: true, message: 'Please input the organization domain!' }],
              })(
                <Input placeholder="Organization domain name"/>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                icon="plus"
              >
                Create organization
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
