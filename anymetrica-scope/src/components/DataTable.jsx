/* @flow */
import fromPairs from 'lodash.frompairs';

import React from 'react';
import {
  Affix,
  Alert,
  Button,
  Card,
  Col,
  Form,
  Icon,
  message,
  Popconfirm,
  Row,
  Spin,
  Table,
} from 'antd';
import { registryClient } from '../client';
import './DataTable.css';

type StateType = {
  error: string,
  items: Array<string>,
  isLoading: boolean,
  selectedRowKeys: Array<number>
}

type PropsType = {
  doDelete: ?(ids: Array<string>) => Promise<any>,
  doRefresh: () => Promise<Array<Object>>,
  doCreate: (records: Array<Object>)=> Promise<any>,
  columns: Array<Object>,
}

export class DataTable extends React.Component<PropsType, StateType> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      items: [],
      isLoading: false,
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    // Pre-fetch
    this.refresh().catch(console.error);
  }

  async doDelete(ids: Array<string>): Promise<any> {
    await (this.props.doDelete || registryClient.Delete)({ ids });
    const msg = `${(ids.length === 1) ? '1 record was' : `${ids.length} records were`} deleted successfully`;
    message.info(
      <div>
        <div>{msg}</div>
        <div>
          If it result of operator mistake, please, contact support service to recover deleted data.
        </div>
      </div>,
    );
  }

  async handleSubmit(records) {
    const { doCreate } = this.props;
    const { items } = this.state;

    this.setState({ isLoading: true });
    try {
      const created = await doCreate(records);
      if (!created) {
        this.setState({ error: 'Empty entity creation result', isLoading: false });
        return;
      }
      if (created.error) {
        this.setState({ error: created.error, isLoading: false });
        return;
      }
      this.setState({
        items: [
          {
            ...created,
            addedRecently: true,
          },
          ...items,
        ],
        isLoading: false,
      });
      await this.refresh();
    } catch (e) {
      console.error(e);
      this.setState({ error: e.message, isLoading: false });
    }
  }

  async handleDelete() {
    const { items, selectedRowKeys } = this.state;

    this.setState({ isLoading: true });
    try {
      await this.doDelete(selectedRowKeys);
    } catch (e) {
      console.error(e);
      this.setState({ error: `${e.message} ${e.stack}`, isLoading: false });
    }
    const idsDict = fromPairs((selectedRowKeys || []).map(id => ([id, true])));
    this.setState({
      items: items.filter(({ id }) => !idsDict[id]),
      selectedRowKeys: [],
      isLoading: false,
    });
  }

  async refresh() {
    const { doRefresh } = this.props;
    if (this.state.isLoading) {
      return;
    }
    this.setState({ isLoading: true });
    const items = await doRefresh();
    this.setState({ items: (items || []), isLoading: false });
  }

  render() {
    const { columns, form, ...otherProps } = this.props;
    const { items, error, isLoading, selectedRowKeys } = this.state;
    const WrappedForm = form ? Form.create()(form) : null;

    const messageEl = error ? (
      <Alert
        message={(
          <span>
            <div style={{ opacity: 0.85 }}>Following error has occurred during last operation:</div>
            <code>
              {(typeof error === 'string') ? error : JSON.stringify(error)}
            </code>
          </span>)}
        type="error"
      />) : null;

    const haveSelection = selectedRowKeys.length > 0;

    const onSelectChange = (newSelectedRowKeys) => {
      this.setState({ selectedRowKeys: newSelectedRowKeys });
    };

    const rowSelection = {
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
      selectedRowKeys,
      onChange: e => onSelectChange(e),
    };

    // const ids = selectedRowKeys.map(rowKey => items[rowKey].id);
    // const removeSelection = idToUnselect => this.setState({
    //   selectedRowKeys: selectedRowKeys.filter(
    //      rowId => items[rowId].id !== idToUnselect),
    // });
    const makeDeleteTitle = itemsCount => `Delete ${itemsCount} record${itemsCount > 1
      ? 's'
      : ''}?`;
    const actionsMenu = (
      <Affix offsetTop={0}>
        <Row gutter={16} style={{ margin: -16, padding: 16, background: 'rgba(255,255,255,0.9)' }}>
          <Col span={4} style={{ textAlign: 'left' }}>
            <span style={{ opacity: 0.75 }}>Selected:</span>
            <span
              style={{
                marginLeft: '0.5em', fontWeight: '300', fontSize: '1.5em',
              }}
            >
              {selectedRowKeys.length}
            </span>
          </Col>
          {haveSelection ? (
            <Col span={2}>
              <Popconfirm
                title={makeDeleteTitle(selectedRowKeys.length)}
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                onConfirm={() => this.handleDelete()}
                placement="bottom"
                okText="Yes, delete"
                cancelText="No, i've changed my mind"
              >
                <Button type="danger">Delete selected</Button>
              </Popconfirm>
            </Col>
          ) : null}
        </Row>
      </Affix>
    );
    // const wf = WrappedForm ? (<WrappedForm onSubmit={data => this.handleSubmit(data)}/>) : '';
    return (
      <Spin delay={500} spinning={isLoading}>
        <div className="table-wrapper">
          {messageEl}
          {WrappedForm
            ? (<WrappedForm onSubmit={data => this.handleSubmit(data)} {...otherProps} />)
            : ''}
          <Card title={actionsMenu}>
            <Table
              {...otherProps}
              isLoading={isLoading}
              columns={columns}
              rowSelection={rowSelection}
              dataSource={items || []}
              onRow={
                ({ addedRecently }) => (addedRecently
                  ? { style: { backgroundColor: '#e8f8ff' } }
                  : {})
              }
            />
          </Card>
        </div>
      </Spin>
    );
  }
}
