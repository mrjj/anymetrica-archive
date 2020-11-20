/* @flow */
import React from 'react';
import { Button, Card, Col, List, Row } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
export class ProfilePage extends React.Component {
  render() {
    const dataSource = [
      'Surrogate Placeholder record #1',
      'Surrogate Placeholder record #2',
      'Surrogate Placeholder record #3',
    ];
    return (
      <Row gutter={32}>
        <Col span={18}>
          <Card title="My activity journal">
            <List
              dataSource={dataSource}
              bordered
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Danger zone!" headStyle={{ color: 'red' }}>
            <span>
              <Button disabled type="danger">Reset my password</Button>
              <div>Password reset link will be sent to your E-mail</div>
            </span>
            <Button disabled type="danger">Close all my open session</Button>
            <div>This will close all sessions you`ve opened on all devices</div>
          </Card>
        </Col>
      </Row>
    );
  }
}
