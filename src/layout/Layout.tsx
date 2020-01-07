import React from 'react';
import { Layout } from 'antd';
import SideMenu from './Menu';
import Breadcrumb from './Breadcrumb';

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
          <Breadcrumb props={[{ path: '/', label: '首页' }]}></Breadcrumb>
          <Layout className="main-content">{ props.children }</Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
