/* @flow */
import React from 'react';
import { ADMINISTRATING, CAN_WRITE_RELATIONS, Organization, OWNS } from 'anymetrica-api/dist/enums';
import { registryClient } from '../client';
import { MetadataCell } from '../components/MetadataCell';
import { DataTable } from '../components/DataTable';
import { CreateOrganizationForm } from './CreateOrganizationForm';


const columns = [
  {
    title: 'Organization name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Organization domain',
    dataIndex: 'domain',
    key: 'domain',
  },
  {
    title: 'Metadata',
    dataIndex: 'metadata.created_ts.seconds',
    render: (text, obj) => (<MetadataCell {...obj.metadata} orientation="horizontal" />),
    key: 'metadata.updated_ts.seconds',
  },
];


export class OrganizationsPage extends React.Component {
  async doRefresh(): Promise<Array<Object>> {
    const found = await registryClient.Discover({
      request: {
        types: [Organization],
        two_way_discovery: true,
        relation_types: [
          OWNS,
          ADMINISTRATING,
          CAN_WRITE_RELATIONS,
        ],
      },
    });
    if (found.entities) {
      const entities = await registryClient.GetOrganizations(
        { ids: found.entities.map(({ id }) => id) },
      );
      return (entities.entities || []);
    }
    return [];
  }

  async doCreate(entity: Object): Promise<Object> {
    const result = await registryClient.MergeOrganizations({ entities: [entity] });
    return result.entities;
  }

  render() {
    return (
      <DataTable
        rowKey={({ id }) => id}
        form={CreateOrganizationForm}
        columns={columns}
        doCreate={this.doCreate}
        doRefresh={() => this.doRefresh()}
      />
    );
  }
}

export default OrganizationsPage;
