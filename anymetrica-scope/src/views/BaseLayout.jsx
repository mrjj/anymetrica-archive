/* @flow */
import React from 'react';
import { Icon, Layout, Menu, Spin } from 'antd';
import Backbone from 'backbone';
import { SessionToken } from 'anymetrica-api/dist/enums';
import { error } from 'anymetrica-utils';
import { getStored, resetStorage } from '../session';
import { DashboardPage } from './DashboardPage';
import { UsersPage } from './UsersPage';
import { AnonymousPage } from './AnonymousPage';
import { DevicesPage } from './DevicesPage';
import { GroupsPage } from './GroupsPage';
import { ProfilePage } from './ProfilePage';
import { SoundCapturePage } from './SoundCapturePage';
import { SoundRecordsPage } from './SoundRecordsPage';
import { registryClient } from '../client';
import { PrivacyPolicy } from './PrivacyPolicy';

export class BaseLayout extends React.Component {
  constructor(props) {
    super(props);
    const that = this;
    const AppRouter = Backbone.Router.extend({
      routes: {
        'home/dashboard': 'dashboard',
        'home/users': 'users',
        'home/groups': 'groups',
        // 'home/organizations': 'organizations',
        'home/devices': 'devices',
        'home/profile': 'profile',
        'home/records': 'records',
        'home/capture': 'capture',
        'home/sign-out': 'signOut',
        '': 'signIn',
        'sign-in': 'signIn',
        'sign-in/:otp': 'signIn',
        'sign-up': 'signUp',
        'sign-up/:otp': 'signUp',
        'privacy-policy': 'pp',
      },
      // anonymous: () => {
      //     that.state.router.navigate('/sign-in', { trigger: true });
      //   } else {
      //     that.setState({ section: 'anonymous', tab: 'sign-in' });
      //   }
      // },
      signIn: (otp) => {
        that.setState({ section: 'anonymous', tab: 'sign-in', otp });
      },
      signUp: (otp) => {
        that.setState({ section: 'anonymous', tab: 'sign-up', otp });
      },
      dashboard: () => {
        if (that.checkAuth()) { that.setState({ section: 'dashboard' }); }
      },
      groups: () => {
        if (that.checkAuth()) { that.setState({ section: 'groups' }); }
      },
      // organizations: () => {
      //   if (that.checkAuth()) { that.setState({ section: 'organizations' }); }
      // },
      records: () => {
        if (that.checkAuth()) { that.setState({ section: 'records' }); }
      },
      devices: () => {
        if (that.checkAuth()) { that.setState({ section: 'devices' }); }
      },
      users: () => {
        if (that.checkAuth()) { that.setState({ section: 'users' }); }
      },
      profile: () => {
        if (that.checkAuth()) { that.setState({ section: 'profile' }); }
      },
      capture: () => {
        if (that.checkAuth()) { that.setState({ section: 'capture' }); }
      },
      signOut: () => {
        resetStorage();
        that.setState({
          session_token: null,
          username: null,
          namespace: null,
        });
        if (this.state.section !== 'anonymous') {
          Backbone.history.navigate('/sign-in', { trigger: true });
        }
      },
    });
    const router = new AppRouter();
    this.state = {
      router,
      section: null,
      ...(getStored()),
    };
  }

  componentWillMount(): void {
    if (!Backbone.History.started) {
      Backbone.history.start({ pushState: true, silent: false });
    }
  }

  async checkAuth() {
    const { router } = this.state;
    const { session_token } = getStored();
    try {
      if (!session_token) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('No session token');
      }
      // Check if session token is fine
      const { entities } = await registryClient.Discover({
        request: {
          credential: {
            session_token: {
              session_token,
            },
          },
          types: [SessionToken],
        },
      });
      if ((!entities) || (entities.length === 0)) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('Invalid session token');
      }
      this.setState(getStored());
      return true;
    } catch (e) {
      error(e);
      router.navigate('home/sign-out', { trigger: true });
    }
    return null;
  }

  render() {
    if (!this.state.section) {
      return (<Spin delay={500} />);
    }
    if (this.state.section === 'anonymous') {
      return (<AnonymousPage {...this.state} />);
    }
    const { username, namespace, router, section } = this.state;
    return (
      <Layout>
        <Layout.Sider
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', width: 200, left: 0 }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" selectedKeys={[section]}>
            <Menu.Item
              key="dashboard"
              label="Home"
              onClick={() => router.navigate('/home/dashboard', { trigger: true })}
            >
              <Icon type="radar-chart" />
              <span className="nav-text">Home</span>
            </Menu.Item>
            <Menu.Item
              key="groups"
              label="Groups"
              onClick={() => router.navigate('/home/groups', { trigger: true })}
            >
              <Icon type="team" />
              <span className="nav-text">Groups</span>
            </Menu.Item>
            {
              /*
              <Menu.Item
                key="organizations"
                label="Organizations"
                onClick={() => router.navigate('/home/organizations', { trigger: true })}
              >
                <Icon type="team" />
                <span className="nav-text">Organizations</span>
              </Menu.Item>
              */
            }
            <Menu.Item
              key="devices"
              label="Devices"
              onClick={() => router.navigate('/home/devices', { trigger: true })}
            >
              <Icon type="qrcode" />
              <span className="nav-text">Devices</span>
            </Menu.Item>
            <Menu.Item
              key="users"
              label="Users"
              onClick={() => router.navigate('/home/users', { trigger: true })}
            >
              <Icon type="user" />
              <span className="nav-text">Users</span>
            </Menu.Item>
            <Menu.Item
              key="records"
              label="Media Records"
              onClick={() => router.navigate('/home/records', { trigger: true })}
            >
              <Icon type="sound" />
              <span className="nav-text">Sound records</span>
            </Menu.Item>
            <Menu.Item
              key="capture"
              label="Sound Capture Test"
              onClick={() => router.navigate('/home/capture', { trigger: true })}
            >
              <Icon type="sound" />
              <span className="nav-text">Sound capture test</span>
            </Menu.Item>
            <Menu.Item
              key="profile"
              label="Profile"
              onClick={() => router.navigate('/home/profile', { trigger: true })}
            >
              <Icon type="user" />
              <span className="nav-text">
                {(
                  <span>
                    <span style={{ marginRight: '0.5em' }} className="bold">{username}</span>
                    <span className="small fade">{namespace}</span>
                  </span>
                ) || (<Icon type="loading" />)}
              </span>
            </Menu.Item>
            <Menu.Item
              key="sign-out"
              label="Sign-Out"
              onClick={() => router.navigate('/home/sign-out', { trigger: true })}
            >
              <Icon type="logout" />
              <span className="nav-text">Sign Out</span>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Layout.Header title="Home" style={{ padding: 0 }} />
          {/* TODO: Dry ugly code below */}
          <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            {section === 'dashboard' ? (
              <DashboardPage {...this.state} />) : null}

            {section === 'groups' ? (
              <GroupsPage {...this.state} />) : null}

            {
              /*  section === 'organizations' ? (
                <OrganizationsPage {...this.state} />) : null
                */
            }

            {section === 'devices' ? (
              <DevicesPage {...this.state} />) : null}

            {section === 'users' ? (
              <UsersPage {...this.state} />) : null}

            {section === 'records' ? (
              <SoundRecordsPage {...this.state} />) : null}

            {section === 'capture' ? (
              <SoundCapturePage {...this.state} />) : null}

            {section === 'profile' ? (
              <ProfilePage {...this.state} />) : null}

            {section === 'pp' ? (
              <PrivacyPolicy {...this.state} />) : null}

          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
