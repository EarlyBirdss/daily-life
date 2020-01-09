import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'dva';

interface BreadcrumbConfig {
  path: string,
  name: string,
}

function PageBreadcrumb({ breadcrumbConfig }: { breadcrumbConfig: Array<BreadcrumbConfig> } ) {
  return (
    <Breadcrumb>
      {
        breadcrumbConfig.map(({ path, name }) =>
          <Breadcrumb.Item key={path}>
            <Link to={path}>{name}</Link>
          </Breadcrumb.Item>)
      }
    </Breadcrumb>
  )
}

export default connect(
  ({ GlobalModel: { breadcrumbConfig } }: { GlobalModel: { breadcrumbConfig: Array<BreadcrumbConfig> } }) => ({ breadcrumbConfig })
)(PageBreadcrumb)
