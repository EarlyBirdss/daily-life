import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import SideMenu from './SideMenu';
import Breadcrumb from './Breadcrumb';

import './style.less';

const { Content, Sider } = Layout;

export default function MainLayout(props: any) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" style={{ width: 200 }}>
        <div className="logo">Mathilda's Little Cabin</div>
        <SideMenu></SideMenu>
      </Sider>
      <Layout>
        <Content style={{ padding: '20px 30px' }}>
          {/* TODO: 增加错误边界功能，防止页面崩溃影响体验 */}
          <Breadcrumb props={[{ path: '/', label: '首页' }]}></Breadcrumb>
          <Layout className="main-content">{ props.children }</Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
