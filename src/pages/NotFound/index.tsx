import React from 'react';
import { Result, Button } from 'antd';
import './index.less';

export default function NotFound() {
  return (
    <>
      <Result
        icon={<div className="not-found-icon" />}
        title="404"
        subTitle="HOW SILLY YOU ARE! YOU ARE GETTING LOST!"
        extra={<Button type="primary">GO THIS WAY</Button>}
      />
    </>
  );
}