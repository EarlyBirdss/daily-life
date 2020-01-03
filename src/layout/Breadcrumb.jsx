import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

export default function PageBreadcrumb({ props }) {
  // TODO: 从router config中拿数据
  return (
    <Breadcrumb>
      {
        props.map(({ path, label }) =>
          <Breadcrumb.Item key={path}>
            <Link to={path}>{label}</Link>
          </Breadcrumb.Item>)
      }
    </Breadcrumb>
  )
}
