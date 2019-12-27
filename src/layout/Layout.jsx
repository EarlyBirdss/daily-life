import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import RoutePage from './Route.jsx';
import SideMenu from './Menu.jsx';

import './style.less';

const { Content, Sider } = Layout;

export default function App(props) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" style={{ width: 200 }}>
        <div className="logo">
        </div>
        <SideMenu></SideMenu>
      </Sider>
      <Layout>
        <Content style={{ padding: '20px 30px' }}>
          <Breadcrumb>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="main-content">{ props.children }</Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
