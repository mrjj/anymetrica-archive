/* @flow */
import React from 'react';
import { Group } from 'anymetrica-api/dist/enums';
import { registryClient } from '../client';
import { MetadataCell } from '../components/MetadataCell';
import { DataTable } from '../components/DataTable';
import { CreateGroupForm } from './CreateGroupForm';


const columns = [
  {
    title: 'Location name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Metadata',
    dataIndex: 'metadata.created_ts.seconds',
    render: (text, obj) => (<MetadataCell {...obj.metadata} orientation="horizontal" />),
    key: 'metadata.updated_ts.seconds',
  },
];


export class GroupsPage extends React.Component {

  async doRefresh(): Promise<Array<Object>> {
    const foundGroups = await registryClient.Discover({ types: [Group] });
    if (foundGroups.entities) {
      const entities = await registryClient.GetGroups(
        { ids: foundGroups.entities.map(({ id }) => id) },
      );
      return (entities.entities || []);
    }
    return [];
  }

  async doCreate(entity: Object): Promise<Object> {
    const group = await registryClient.MergeGroups({ entities: [entity] });
    return group.entities;
  }

  render() {
    return (
      <DataTable
        rowKey={({ id }) => id}
        form={CreateGroupForm}
        columns={columns}
        doCreate={this.doCreate}
        doRefresh={() => this.doRefresh()}
      />
    );
  }
}

export default GroupsPage;
