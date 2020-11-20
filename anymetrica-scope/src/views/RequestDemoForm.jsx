/* @flow */
import React from 'react';

import { Alert, Button, Form, Input, message, Modal, Spin } from 'antd';
import { registryClient } from '../client';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class RequestDemoForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      isLoading: false,
      isOpen: props.isOpen || false,
    };
  }

  state = {
    isOpen: false,
  };

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true, error: null });
    this.props.form.validateFields(async (errors, values) => {
      if (errors) {
        this.setState({ isLoading: false });
        return;
      }
      try {
        await registryClient.RequestDemo({
          request_info: {
            email: values.email,
            phone: values.phone,
            company: values.company,
            whiami: values.whiami,
          },
        });
        this.setState({
          isLoading: false,
          isOpen: false,
        });
        message.info('Thank you for your interest! We received your request and will contact you soon.');
      } catch (signInError) {
        this.setState({
          error: signInError.message || signInError.details,
          isLoading: false,
          isOpen: false,
        });
      }
    });
  }

  setOpen(isOpen) {
    this.setState({ isOpen });
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { error, isLoading, isOpen } = this.state;
    return (
      <div>
        <Button
          type="dashed"
          htmlType="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setOpen(true);
          }}
        >
          Request demo
        </Button>
        <Modal
          title="Request a demo"
          visible={isOpen}
          onCancel={() => this.setOpen(false)}
          onOk={e => this.onSubmit(e)}
        >
          {
            error ? (
              <Alert
                message={error}
                type="error"
                showIcon
              />
            ) : null
          }
          <Form
            onSubmit={e => this.onSubmit(e)}
            className="submit-demo-form"
          >
            <Spin spinning={isLoading} delay={500}>
              <Form.Item
                label="Company name"
                help="Please input your company name or your own name if you are private person who have interest to our product">
                {getFieldDecorator('company', {
                  rules: [
                    {
                      required: true,
                      message: 'Please, introduce company or yourself',
                    },
                  ],
                })(
                  <Input
                    autoFocus
                    placeholder="Acme LIMITED"
                  />,
                )}
              </Form.Item>
              <Form.Item label="Contact E-mail">
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email' }],
                })(
                  <Input
                    autoFocus
                    placeholder="example@test.com"
                  />,
                )}
              </Form.Item>
              <Form.Item label="Contact phone" help="Its optional">
                {getFieldDecorator('phone', {})(
                  <Input
                    autoFocus
                    placeholder="+1 234 5678901"
                  />,
                )}
              </Form.Item>
              <Form.Item label="Some words about you and your company">
                {getFieldDecorator('whoami', {})(
                  <Input
                    type="textarea"
                    placeholder="We are ACME LIMITED, the company having a deep interest in how far the technical progress can go toward business needs..."
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  Submit a demo request
                </Button>
              </Form.Item>
            </Spin>
          </Form>
        </Modal>
      </div>
    );
  }
}
