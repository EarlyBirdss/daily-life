import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Route from './Route';

import styles from './style.less';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function(props) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible style={{ background: '#fff' }}>
        <div className="logo">
        </div>
        <Menu defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <span>Option 1</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.ItemGroup key="g1" title="Item 1">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="g2" title="Item 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Route/>
        </Content>
      </Layout>
    </Layout>
  );
}
