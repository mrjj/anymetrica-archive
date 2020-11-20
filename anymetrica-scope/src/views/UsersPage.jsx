/* eslint-disable no-undef */
/* @flow */
import pick from 'lodash.pick';
import compact from 'lodash.compact';
import get from 'lodash.get';
import moment from 'moment';
import QRious from 'qrious';
import { message, Spin } from 'antd';
import React from 'react';
import {
  ADMINISTRATING,
  Contact,
  CONTACT_EMAIL,
  Group,
  HAVE_MEMBER,
  HAVE_PART,
  Human,
  Organization,
  OTP,
  OWNS,
  PostalAddress,
  UsernamePassword,
} from 'anymetrica-api/dist/enums';
import { registryClient } from '../client';
import { MetadataCell, secondsToHumanTime } from '../components/MetadataCell';
import { DataTable } from '../components/DataTable';
import { CreateUserForm } from './CreateUserForm';
import { ACCESS_LEVEL, QR_CODE_MAX_SIZE } from '../constants';
import { getStored } from '../session';

const getCompareObjects = field => (a, b) => {
  if (a[field] < b[field]) {
    return -1;
  }
  if (a[field] > b[field]) {
    return 1;
  }
  return 0;
};

const columns = [
  {
    title: 'User Name',
    dataIndex: 'usernamePassword',
    key: 'usernamePassword',
    render: ups => (
      <span>
        {(ups || []).map(up => (
          <div key={`${[up.namespace, up.username].join(':')}`} style={{ fontWeight: 700 }}>
            {up.username || ''}
            {up.namespace ? (
              <span className="small fade" style={{ marginLeft: '0.5em' }}>
                {up.namespace}
                :
              </span>
            ) : null}
          </div>))}
      </span>
    ),
  },
  {
    title: 'Personal info',
    dataIndex: 'full_name',
    key: 'full_name',
    render: (full_name, human) => (
      <span>
        <div key={human.id}>
          {compact(
            [
              'title',
              'first_name',
              'middle_name',
              'last_name',
              'suffix',

            ].map(f => get(human, f, null)),
          ).join(' ')}
        </div>
        <div>
          {human.date_of_birth ? moment(human.date_of_birth).format('YYYY-MM-DD') : (
            <span className="fade">N/A</span>)}
        </div>
      </span>),
  },
  {
    title: 'Contacts',
    dataIndex: 'contact',
    key: 'contact',
    render: contact => (
      <div>
        {(contact || []).map(
          ({ contact_type, data }) => (
            <div key={data}>
              <span className="small fade">
                {contact_type}
                :
              </span>
              {' '}
              {data}
            </div>),
        )}
      </div>
    ),
  },
  {
    title: 'Groups',
    dataIndex: 'group',
    key: 'group',
    render: group => (
      <div>
        {(group || []).map(
          ({ name }) => (
            <div key={name}>{name}</div>),
        )}
      </div>
    ),
  },
  {
    title: 'Organizations',
    dataIndex: 'organization',
    key: 'organization',
    render: organization => (
      <div>
        {(organization || []).map(
          ({ domain, name }) => (
            <div key={domain || name}>
              {
                domain
                  ? (
                    <div>
                      <div className="big">{name}</div>
                      <div className="thin">
                        <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer">
                          {`https://${domain}`}
                        </a>
                      </div>
                    </div>
                  )
                  : name || (<span className="fade">Unnamed</span>)
              }
            </div>),
        )}
      </div>
    ),
  },
  {
    title: 'OTP Code',
    dataIndex: 'otp',
    key: 'otp',
    render: otps => (
      <span>
        {(otps || []).map((otp) => {
          const otpLink = `${window.location.origin}/sign-up/${(otp || {}).otp || ''}`;
          const otpUrlQrDataUrl = new QRious({
            size: QR_CODE_MAX_SIZE,
            value: otpLink,
            backgroundAlpha: 1,
          }).toDataURL();
          return (
            <div className="qr-code-cell" key={otp.id}>
              <div>
                <div className="qr-code-image-placeholder">
                  <img alt="qr-code" className="qr-code-image" src={otpUrlQrDataUrl} />
                </div>
              </div>
              <div>
                {
                  otp.is_revoked
                    ? (
                      <div>
                        <div style={{ opacity: 0.75 }}>{otp.public}</div>
                        <div style={{ color: 'red' }}>
                          <span style={{ fontWeight: 'bold' }}>Revoked: </span>
                          <span>{secondsToHumanTime(otp.metadata.updated_ts.seconds)}</span>
                        </div>
                      </div>
                    )
                    : (
                      <div>
                        <div style={{ fontWeight: 700 }}>{otp.public}</div>
                        <span style={{ color: 'green' }}> Unused</span>
                      </div>
                    )
                }
                <div><a href={otpLink} target="_blank" rel="noopener noreferrer">{otpLink}</a></div>
                <div style={{ fontSize: '0.7em' }}>(opens in new window)</div>
              </div>
            </div>);
        })}
      </span>
    ),
  },
  {
    title: 'Profile Metadata',
    dataIndex: 'metadata',
    render: metadata => (<MetadataCell {...metadata} orientation="vertical" />),
    key: 'metadata',
  },
  {
    title: 'Tester?',
    dataIndex: 'is_testing',
    key: 'is_testing',
    render: is_testing => (is_testing ? 'Yes' : (<span className="fade">No</span>)),
  },
];
const { CAN_READ, CAN_RESET, CAN_WRITE, CAN_READ_RELATIONS } = ACCESS_LEVEL;

export class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      loading: true,
    };
  }

  componentWillMount(): void {
    const req = {
      request: {
        traverse_depth: 3,
        two_way_discovery: true,
        types: [Organization],
        relation_types: [ADMINISTRATING],
      },
    };
    registryClient.Discover(req).then(({ entities }) => {
      this.setState({ loading: false, organizations: entities });
    }).catch((e) => {
      console.error(e);
      // eslint-disable-next-line
      this.setState({ loading: false, error: e.message });
    });
  }

  async doCreate(record: Object): Promise<Object> {
    const human = (await registryClient.MergeHumans({
      entities: [
        {
          ...pick(
            record,
            ['first_name', 'middle_name', 'last_name', 'suffix', 'is_virtual'],
          ),
          metadata: { label: record.label },
          date_of_birth: record.date_of_birth ? {
            year: moment(get(record, 'date_of_birth', new Date())).get('year'),
            month: moment(get(record, 'date_of_birth', new Date())).get('month'),
            day: moment(get(record, 'date_of_birth', new Date())).get('date'),
          } : null,
        },
      ],
    })).entities[0];

    const contact = (await registryClient.MergeContacts({
      entities: [
        { contact_type: CONTACT_EMAIL, data: record.email },
      ],
    })).entities[0];

    const otp = (await registryClient.MergeOTPs({
      entities: [
        { is_not_set: true },
      ],
    })).entities[0];

    // TODO: Add creation of fixed id

    const organization = record.organizationId
      ? (await registryClient.GetOrganizations({ ids: [record.organizationId] })).entities[0]
      : (await registryClient.Discover({
        request: {
          two_way_discovery: true,
          traverse_depth: 2,
          types: [Organization],
        },
      })).entities[0];
    const usernamePassword = (await registryClient.MergeUsernamePasswords({
      entities: [
        {
          is_not_set: true,
          namespace: organization.domain || getStored().namespace || '',
          username: record.username || '',
          // use current user namespace or any other if user is namespace administrator
        },
      ],
    })).entities[0];

    const sessionToken = (await registryClient.MergeSessionTokens({
      entities: [{ is_not_set: true }],
    })).entities[0];

    const group = (await registryClient.MergeSessionTokens({
      entities: [
        {
          name: `${record.username || getStored().username || ''} personal`,
        },
      ],
    })).entities[0];

    console.info(`Using following organization for user: "${organization.name}" (ID=${organization.id})`);
    await registryClient.MergeRelations({
      relations: [
        { from_id: otp.id, relation_types: [CAN_READ, CAN_READ_RELATIONS], to_id: otp.id },

        // Invitation code allowing to read and set password directly
        { from_id: otp.id, relation_types: [CAN_READ, CAN_WRITE], to_id: usernamePassword.id },

        // Login and password are allowing self re-definition and introspection
        {
          from_id: usernamePassword.id,
          relation_types: [CAN_RESET, CAN_READ, CAN_READ_RELATIONS, CAN_WRITE],
          to_id: usernamePassword.id,
        },
        // logpass can access to session
        {
          from_id: usernamePassword.id,
          relation_types: [CAN_RESET, CAN_READ],
          to_id: sessionToken.id,
        },

        // Human can read and reset login and password
        // but write own password value directly or break human-pass consistency is possible
        // only using logpass credentials
        // Session giving full access to human as entry point
        { from_id: sessionToken.id, relation_types: [CAN_RESET, CAN_READ], to_id: sessionToken.id },
        // Session giving full access to human as entry point
        { from_id: sessionToken.id, relation_types: [ADMINISTRATING], to_id: human.id },

        // Human is entry point to business logic, all credential relations are finished
        // now defining how human relates with things inside in clean zone

        // Human can see and reset own login and password
        {
          from_id: human.id,
          relation_types: [OWNS, CAN_RESET, CAN_READ, CAN_READ_RELATIONS],
          to_id: usernamePassword.id,
        },
        // Human Can see own invitation code
        { from_id: human.id, relation_types: [OWNS, CAN_READ], to_id: otp.id },
        // Human can reset session
        {
          from_id: human.id,
          relation_types: [OWNS, CAN_READ, CAN_RESET],
          to_id: sessionToken.id,
        },
        // Human in main administrator
        {
          from_id: human.id,
          relation_types: [CAN_READ, CAN_READ_RELATIONS],
          to_id: organization.id,
        },
        // User is NOT self-managing own email, having only read access
        { from_id: human.id, relation_types: [OWNS, CAN_READ], to_id: contact.id },
        // Group and location
        { from_id: human.id, relation_types: [OWNS, ADMINISTRATING], to_id: group.id },

        // Own administrator group have administrator as member
        { from_id: group.id, relation_types: [HAVE_MEMBER], to_id: human.id },
        {
          from_id: organization.id,
          relation_types: [HAVE_MEMBER, CAN_READ, CAN_READ_RELATIONS],
          to_id: human.id,
        },
      ],
    });
    return human;
  }

  async doRefresh(): Promise<Array<Object>> {
    let allRelations = [];
    let organizationsAndGroups = [];
    const res = {};
    try {
      const allHumansRelations = await registryClient.Discover({
        request: {
          types: [Human],
          relation_types: [ADMINISTRATING],
          traverse_depth: 8,
        },
      });
      const humans = allHumansRelations.entities;
      humans.forEach((h) => {
        res[h.id] = {
          ...h,
          otp: {},
          usernamePassword: {},
          contact: {},
          group: {},
          organization: {},
          postalAddress: {},
          location: {},
        };
      });
      allRelations = (await registryClient.Discover(
        {
          ids: humans.map(({ id }) => id),
          request: {
            types: [
              UsernamePassword,
              OTP,
              Contact,
            ],
            two_way_discovery: true,
            relation_types: [OWNS, HAVE_PART],
            traverse_depth: 1,
          },
        },
        {
          discoverFrom: true,
          discoverTo: true,
        },
      )).relations;
      organizationsAndGroups = (await registryClient.Discover(
        {
          ids: humans.map(({ id }) => id),
          request: {

            types: [
              Group,
              Organization,
            ],
            two_way_discovery: true,
            relation_types: [HAVE_MEMBER],
            traverse_depth: 2,
          },
        },
        {
          discoverFrom: true,
          discoverTo: true,
        },
      )).relations;
    } catch (e) {
      console.error(e);
      message(`${JSON.stringify(e)}`);
      return [];
    }
    [
      ...allRelations,
      ...organizationsAndGroups,
    ].forEach(({ from_id, from, to_id, to }) => {
      const human_id = from.metadata.type === Human ? from_id : to_id;
      if (!res[human_id]) {
        return;
      }
      const o = from.metadata.type === Human ? to : from;
      if (!o.metadata) {
        return;
      }
      if (o.metadata.type === Contact) {
        res[human_id].contact[o.id] = o;
      }
      if (o.metadata.type === Organization) {
        res[human_id].organization[o.id] = o;
      }
      if (o.metadata.type === Group) {
        res[human_id].group[o.id] = o;
      }
      if (o.metadata.type === UsernamePassword) {
        res[human_id].usernamePassword[o.id] = o;
      }
      if (o.metadata.type === OTP) {
        res[human_id].otp[o.id] = o;
      }
      if (o.metadata.type === PostalAddress) {
        res[human_id].postalAddress[o.id] = o;
      }
      if (o.metadata.type === Location) {
        res[human_id].location[o.id] = o;
      }
      // return null;
    });
    return Object.values(res).sort(getCompareObjects('id')).map(
      (h) => {
        [
          'otp',
          'usernamePassword',
          'contact',
          'group',
          'organization',
          'location',
          'postalAddress',
        ].forEach(
          (field) => {
            h[field] = Object.values(h[field]).sort(getCompareObjects('id'));
          },
        );
        return h;
      },
    );
  }

  render() {
    const { organizations, loading } = this.state;
    return (
      <Spin spinning={loading} delay={500}>
        <DataTable
          rowKey={({ id }) => id}
          form={CreateUserForm}
          columns={columns}
          doCreate={this.doCreate}
          doRefresh={() => this.doRefresh(this.props.session)}
          organizations={organizations}
        />
      </Spin>
    );
  }
}
